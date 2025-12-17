import React, { useEffect, useRef, useState } from 'react';
import type { DataEntryMap } from 'astro:content';
import * as d3 from 'd3';

import type { RoleType } from '@/lib/utils/constants';

import styles from './Graph.module.css';

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
            return "rgb(var(--color-accent-foreground))";
        case "christian":
            return "rgb(76 196 205)";
        default:
            return "rgb(92 59 46)";
    }
}

const Graph: React.FC<GraphProps> = ({ writings }) => {
    const containerRef = useRef<SVGSVGElement>(null);
    const simulationRef = useRef<d3.Simulation<Node, undefined> | null>(null);
    const draggedNodePoseRef = useRef<{x: number, y: number} | undefined>(undefined);

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

        const link = svg.append("g")
            .selectAll("line")
            .data(links)
            .join("line");


        const node = svg.append("g")
            .selectAll<SVGAElement, Node>("a")
            .data(nodes)
            .join("a")
            .attr("href", d => "/" + d.id)
            .attr("style", "cursor: pointer; text-decoration: none;")
            .append("circle")
            .attr("stroke", d => d.type == "blog" ? "transparent" : colorFromRole(d.role))
            .attr("stroke-width", d => d.type == "blog" ? 0 : 3)
            .attr("stroke-opacity", d => d.type == "blog" ? 0 : 0.6)
            .attr("r", d => 4 + Math.sqrt(d.links))
            .attr("fill", d => d.type == "blog" ? colorFromRole(d.role) : "rgb(var(--color-primary-background))")
            .attr("fill-opacity", d => d.type == "blog" ? 0.6 : 1)
            .on("mouseover", function(_, d) {
                d3.select(this)
                    .attr("data-selected", "true");
                const temp = d3.selectAll<SVGLineElement, Link>("line")
                    .filter(l => (l.source as unknown as Node).id === d.id || (l.target as unknown as Node).id === d.id)
                    .attr("data-selected", "true");
                console.log(temp);
            })
            .on("mouseout", function(_, d) {
                d3.select(this)
                    .attr("data-selected", null);
                d3.selectAll<SVGLineElement, Link>("line")
                    .filter(l => {
                        return (l.source as unknown as Node).id === d.id || (l.target as unknown as Node).id === d.id
                    })
                        
                    .attr("data-selected", null);
            });

        node.call(d3.drag<SVGCircleElement, Node>()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );
  
        svg.call(d3.zoom<SVGSVGElement, unknown>()
            .extent([[0, 0], [width, height]])
            .scaleExtent([.3, 2])
            .on("zoom", zoomed));

        simulation.on("tick", () => {
            link.attr("x1", d => (d.source as unknown as Node).x)
                .attr("y1", d => (d.source as unknown as Node).y)
                .attr("x2", d => (d.target as unknown as Node).x)
                .attr("y2", d => (d.target as unknown as Node).y);

            node.attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });

        function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            draggedNodePoseRef.current = {x: event.x, y: event.y};
            event.subject.fx = draggedNodePoseRef.current!.x;
            event.subject.fy = draggedNodePoseRef.current!.y;
        }
        function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
            const transform = d3.zoomTransform(containerRef.current!);
            event.subject.fx = draggedNodePoseRef.current!.x  + (event.x - draggedNodePoseRef.current!.x) / transform.k;
            event.subject.fy = draggedNodePoseRef.current!.y  + (event.y - draggedNodePoseRef.current!.y) / transform.k;
        }
        function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
            if (!event.active) simulation.alphaTarget(0);
            draggedNodePoseRef.current = undefined;
            event.subject.fx = undefined;
            event.subject.fy = undefined;
        }
        function zoomed({transform}: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
            node.attr("transform", transform.toString());
            link.attr("transform", transform.toString());
        }

        return () => {
            simulation.stop();
        }
    }, [containerRef]);

  return <svg ref={containerRef} className={styles.writingGraph} />;
};

export default Graph;