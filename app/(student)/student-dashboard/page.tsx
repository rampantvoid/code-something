"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const page = () => {
  const [selected, setSelected] = useState("all");
  const sessionData = [
    {
      id: "SID001",
      title: "Queues",
      date: new Date().toDateString(),
      batches: ["B1", " B2"],
      status: "Ongoing",
      rank: "--/--",
    },
    {
      id: "SID002",
      title: "Stacks",
      date: new Date().toDateString(),
      batches: ["B1"],
      status: "Completed",
      rank: "1/35",
    },
  ];
  return (
    <div>
      <p className="text-2xl font-semibold">Sessions</p>
      <div className="w-full flex py-4 gap-4 items-center">
        <p
          className={`${
            selected === "all" ? "bg-gray-200" : "hover:bg-gray-200"
          } rounded-sm py-2 px-4 text-black hover:cursor-pointer transition duration-200`}
          onClick={() => {
            setSelected("all");
          }}
        >
          All
        </p>
        <p
          className={`${
            selected === "ongoing" ? "bg-gray-200" : "hover:bg-gray-200"
          } rounded-sm py-2 px-4 text-black hover:cursor-pointer transition duration-200`}
          onClick={() => {
            setSelected("ongoing");
          }}
        >
          Ongoing
        </p>
        <p
          className={`${
            selected === "completed" ? "bg-gray-200" : "hover:bg-gray-200"
          } rounded-sm py-2 px-4 text-black hover:cursor-pointer transition duration-200`}
          onClick={() => {
            setSelected("completed");
          }}
        >
          Completed
        </p>
      </div>
      <Table className="text-md rounded-md">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Batches</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rank</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessionData.map((data, _) => (
            <TableRow className="hover:bg-gray-200 hover:cursor-pointer border-gray-200">
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.title}</TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.batches}</TableCell>
              <TableCell className="flex items-center gap-2">
                <div
                  className={`bg-${
                    data.status === "Ongoing" ? "green" : "red"
                  }-500 w-3 h-3 rounded-full`}
                ></div>
                {data.status}
              </TableCell>
              <TableCell>{data.rank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
