import React, { useEffect, useRef, useState } from 'react';
import type { DataEntryMap } from 'astro:content';
import * as d3 from 'd3';

import { displayRole, type RoleType } from '@/lib/utils/constants';

import graphStyle from './Graph.module.css';

type Writing = DataEntryMap["blog" | "note"][string];

interface GraphProps {
  writings: Writing[];
}
interface Node {
    id: string, 
    label: string, 
    type: "blog" | "note", 
    role: RoleType, 
    links: number,
    x: number,
    y: number,
    fx?: number,
    fy?: number,
}
interface Link {
    source: string;
    target: string;
}


function colorFromRole(role: RoleType): string {
    switch (role) {
        case "developer":
            return "var(--color-accent-foreground)";
        case "christian":
            return "76 196 205";
        default:
            return "148 171 147";
    }
}
function isLinkMatchingNode(link: Link, node: Node): boolean {
    return ((link.source as unknown as Node).id === node.id || (link.target as unknown as Node).id === node.id);
}

const Graph: React.FC<GraphProps> = ({ writings }) => {
    const containerRef = useRef<SVGSVGElement>(null);
    const simulationRef = useRef<d3.Simulation<Node, undefined> | null>(null);
    const draggedNodePoseRef = useRef<{x: number, y: number} | undefined>(undefined);
    const touchStartDistanceRef = useRef<number | undefined>(undefined);
    const selectedNodeRef = useRef<Node | undefined>(undefined);

    useEffect(() => {
        if (!containerRef.current) return;
        if (simulationRef.current) {
            simulationRef.current.stop();
            containerRef.current.innerHTML = '';
        }
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const allIds = new Set(writings.map(w => w.id));
        const nodes: Node[] = writings.map(w => ({ 
            id: w.id, 
            label: w.data.title, 
            type: w.collection, 
            role: w.id.split('/')[2] as RoleType, 
            links: w.data.hasLinksTo.length,
            x: Math.random() * width - width / 2,
            y: Math.random() * height - height / 2,
        }));

        const linkSet = new Set<string>();
        writings.forEach(w => {
                w.data.hasLinksTo.filter(target => allIds.has(target)).forEach(target => {
                const edgeId = [w.id, target].sort().join('|');
                linkSet.add(edgeId);
            });
        });

        const links: Link[] = Array.from(linkSet).map(edgeId => {
            const [source, target] = edgeId.split('|');
            return { source, target };
        });



        const simulation = d3.forceSimulation<Node>(nodes)
            .force('link', d3.forceLink<Node, Link>(links).id(n => n.id).strength(.2).distance(20))
            .force('charge', d3.forceManyBody().strength(-200))
            .force('x', d3.forceX().strength(0.2))
            .force('y', d3.forceY().strength(0.2));
        simulationRef.current = simulation;

        const svg = d3.select(containerRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height]);

        const linkGroup = svg.append("g");
        const link = linkGroup
            .selectAll("line")
            .data(links)
            .join("line");

        const nodeGroup = svg.append("g");

        const nodeLinks = nodeGroup.selectAll<SVGAElement, Node>("a")
            .data(nodes)
            .join("a")
            .attr("data-type", d => d.type)
            .attr("href", d => "/" + d.id);

        const node = nodeLinks.append("circle")
            .attr("r", d => 2 + Math.sqrt(links.filter(l => isLinkMatchingNode(l, d)).length))
            .style("--node-color", d => colorFromRole(d.role));

        const textLableGroup = svg.append("g");
        const textLabel = textLableGroup.selectAll<SVGTextElement, Node>("text.label")
            .data(nodes)
            .join("text")
            .attr("class", graphStyle.label)
            .text(d => d.label);
            
        const textDescriptionGroup = svg.append("g");
        const textDescription = textDescriptionGroup.selectAll<SVGTextElement, Node>("text.description")
            .data(nodes)
            .join("text")
            .attr("class", graphStyle.description)
            .text(d => `${d.type} by a ${displayRole(d.role)}`);

        function handleMouseOver(this: SVGCircleElement, event: React.MouseEvent<SVGCircleElement>, d: Node) {
            d3.select(this.parentElement)
                .attr("data-selected", "true");
            textLabel.filter(n => n.id === d.id).attr("data-selected", "true");
            textDescription.filter(n => n.id === d.id).attr("data-selected", "true");
            d3.selectAll<SVGLineElement, Link>("line")
                .filter(l => isLinkMatchingNode(l, d))
                .attr("data-selected", "true");
        }

        function handleMouseOut(this: SVGCircleElement, event: React.MouseEvent<SVGCircleElement>, d: Node) {
            d3.select(this.parentElement)
                .attr("data-selected", null);
            textLabel.filter(n => n.id === d.id).attr("data-selected", null);
            textDescription.filter(n => n.id === d.id).attr("data-selected", null);
            d3.selectAll<SVGLineElement, Link>("line")
                .filter(l => isLinkMatchingNode(l, d))
                .attr("data-selected", null);
        }

        node.on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("touchstart", handleMouseOver)
            .on("touchend", handleMouseOut);

        node.call(d3.drag<SVGCircleElement, Node>()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );
  
        svg.call(d3.zoom<SVGSVGElement, unknown>()
            .extent([[0, 0], [width, height]])
            .scaleExtent([.3, 10])
            .on("zoom", zoomed));

        simulation.on("tick", () => {
            link.attr("x1", d => (d.source as unknown as Node).x)
                .attr("y1", d => (d.source as unknown as Node).y)
                .attr("x2", d => (d.target as unknown as Node).x)
                .attr("y2", d => (d.target as unknown as Node).y);

            node.attr("cx", d => d.x)
                .attr("cy", d => d.y);
            textLabel.attr("x", d => d.x)
                .attr("y", d => d.y + 32);
            textDescription.attr("x", d => d.x)
                .attr("y", d => d.y + 48);
        });

        function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            draggedNodePoseRef.current = {x: event.x, y: event.y};
            event.subject.fx = draggedNodePoseRef.current!.x;
            event.subject.fy = draggedNodePoseRef.current!.y;
        }
        function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
            if (!event.active) simulation.alphaTarget(0);
            draggedNodePoseRef.current = undefined;
            event.subject.fx = undefined;
            event.subject.fy = undefined;
        }
        function zoomed({transform}: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
            // if (transform.k > 6) {
            //     textLabel.attr("data-zoomed-in", "true");
            //     textDescription.attr("data-zoomed-in", "true");
            // }
            // else {
            //     textLabel.attr("data-zoomed-in", null);
            //     textDescription.attr("data-zoomed-in", null);
            // }

            svg.attr("transform", transform.toString());
        }

        return () => {
            simulation.stop();
        }
    }, [containerRef]);

  return <svg ref={containerRef} className={graphStyle.writingGraph} />;
};

export default Graph;