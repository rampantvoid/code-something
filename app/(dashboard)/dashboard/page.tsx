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
  return (
    <div>
      <Link href="dashboard/new-session">
        <Button className="flex items-center justify-center gap-2">
          New Session
          <Image
            src="https://img.icons8.com/?size=100&id=95782&format=png&color=FFFFFF"
            alt="+"
            width={25}
            height={25}
          ></Image>
        </Button>
      </Link>

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
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-gray-200 hover:cursor-pointer border-gray-200">
            <TableCell className="font-medium">SID001</TableCell>
            <TableCell>Queues</TableCell>
            <TableCell>{new Date().toDateString()}</TableCell>
            <TableCell>B1 B2</TableCell>
            <TableCell className="flex items-center gap-2">
              <div className="bg-green-500 w-3 h-3 rounded-full"></div>
              Ongoing
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-gray-200 hover:cursor-pointer">
            <TableCell className="font-medium">SID002</TableCell>
            <TableCell>Graphs</TableCell>
            <TableCell>{new Date().toDateString()}</TableCell>
            <TableCell>B3</TableCell>
            <TableCell className="flex items-center gap-2">
              <div className="bg-red-500 w-3 h-3 rounded-full"></div>
              Completed
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
