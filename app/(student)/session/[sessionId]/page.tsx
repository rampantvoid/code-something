"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import axios from "axios";

interface TestCase {
  id: string;
  input: string;
  output: string;
}

interface Question {
  id: string;
  text: string;
  points: number;
  testCases: TestCase[];
}

interface Session {
  id: string;
  duration: number;
  semester: number;
  batch: string;
  status: string;
  questions: Question[];
}

const page = () => {
  const editorRef = useRef();
  const { sessionId } = useParams();
  const [currentTestCase, setCurrentTestCase] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sessionTasks, setSession] = useState<Session | null>(null);
  const [currentSection, setCurrentSection] = useState("description");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const sections = [
    {
      title: "description",
      img: "https://img.icons8.com/?size=100&id=82775&format=png&color=228BE6",
    },
    {
      title: "AI assistance",
      img: "https://img.icons8.com/?size=100&id=61864&format=png&color=FAB005",
    },
    {
      title: "compare",
      img: "https://img.icons8.com/?size=100&id=11700&format=png&color=000000",
    },
  ];

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "https://6turons7vrdko7r2zn3kotdqni0xnvlx.lambda-url.ap-south-1.on.aws/",
        {
          language: "c",
          code: code,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      );

      console.log(response.data);
      setOutput(response.data);
      setCurrentTestCase(-1);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/v1/sessions/${sessionId}`
        );
        console.log(response.data.data);
        setSession(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  if (loading) return <div>Loading...</div>;
  if (!sessionTasks) return <div>No session data available</div>;

  return (
    <div className="w-full h-screen flex flex-col p-4 gap-1">
      <div className="flex item-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-lg">CodeYantra</p>
          <Sheet>
            <SheetTrigger className="bg-black p-2 rounded-md text-white px-4 hover:bg-gray-600 transition">
              Session Details
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Session Detail</SheetTitle>
              </SheetHeader>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full bg-black">
                  <TabsTrigger value="tasks" className="w-full">
                    Taks
                  </TabsTrigger>
                  <TabsTrigger value="ranking" className="w-full">
                    Live Rankings
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tasks" className="flex flex-col gap-1">
                  {sessionTasks.questions.map((question, key) => (
                    <div
                      className="bg-gray-200 p-2 rounded-md hover:cursor-pointer hover:bg-gray-400 flex items-center justify-between"
                      onClick={() => setCurrentQuestion(key)}
                    >
                      <p>Task {question.id}</p>
                      <p className="text-sm font-light">Not Attempted</p>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="ranking">
                  Change your password here.
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex item-center justify-end gap-2">
          <Button
            className="bg-secondary flex items-center gap-2 px-8"
            onClick={onSubmit}
          >
            <Image
              src="https://img.icons8.com/?size=100&id=85165&format=png&color=FFFFFF"
              alt="run"
              width={20}
              height={20}
            ></Image>
            Run
          </Button>
          <Button className="bg-accent px-8">Submit</Button>
          <Button className="bg-red-500 px-8">Finish</Button>
        </div>
      </div>
      <ResizablePanelGroup direction="horizontal" className="gap-1">
        <ResizablePanel className="rounded-lg bg-white border-gray-300 border">
          <div className="bg-gray-100 p-2 flex">
            {sections.map((section, key) => (
              <div
                className={`flex items-center gap-1 text-sm hover:bg-secondary p-1 rounded-md hover:cursor-pointer capitalize text-${
                  currentSection === section.title ? "black" : "secondary"
                }`}
                onClick={() => setCurrentSection(section.title)}
              >
                <Image
                  src={section.img}
                  alt="icon"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                {section.title}
              </div>
            ))}
          </div>
          <div className="p-4">
            <p className="text-lg font-semibold">
              {/* Task {sessionTasks.questions[0].id} */}
              Task {currentQuestion + 1}
            </p>
            {sessionTasks.questions[currentQuestion].text}
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel>
          <ResizablePanelGroup direction="vertical" className="gap-1">
            <ResizablePanel
              defaultSize={75}
              className="rounded-lg bg-white border-gray-300 border"
            >
              <div className="bg-gray-100 p-2 flex">
                <div
                  className={`flex items-center gap-1 text-sm p-1 rounded-md capitalize`}
                >
                  <p>{`</>`} Code</p>
                </div>
              </div>
              <div className="w-full h-full">
                <Editor
                  theme="vs-dark"
                  height="100%"
                  defaultLanguage="cpp"
                  language="cpp"
                  defaultValue="// some comment"
                  onMount={onMount}
                  value={code}
                  onChange={(value) => setCode(value)}
                />
                ;
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize={25}
              className="rounded-lg bg-white border-gray-300 border"
            >
              <div className="bg-gray-100 p-2 flex">
                {output ? (
                  <div
                    className={`flex items-center gap-1 text-sm hover:bg-secondary p-1 rounded-md hover:cursor-pointer capitalize"`}
                    onClick={() => setCurrentTestCase(-1)}
                  >
                    <p>Output</p>
                  </div>
                ) : (
                  <></>
                )}
                {sessionTasks.questions[currentQuestion].testCases.map(
                  (testCase, key) => (
                    <div
                      className={`flex items-center gap-1 text-sm hover:bg-secondary p-1 rounded-md hover:cursor-pointer capitalize"`}
                      onClick={() => setCurrentTestCase(key)}
                    >
                      <p>Test Case {key + 1}</p>
                    </div>
                  )
                )}
              </div>

              <div className="w-full p-2">
                {currentTestCase == -1 ? (
                  <p>{output}</p>
                ) : (
                  <>
                    <p>Input</p>
                    <p className="py-2 px-4 bg-gray-100 rounded-md">
                      {
                        sessionTasks.questions[currentQuestion].testCases[
                          currentTestCase
                        ].input
                      }
                    </p>
                    <p>Output</p>
                    <p className="py-2 px-4 bg-gray-100 rounded-md">
                      {
                        sessionTasks.questions[currentQuestion].testCases[
                          currentTestCase
                        ].output
                      }
                    </p>
                  </>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default page;

// const sessionTasks = {
//     title: "Stacks",
//     questions: [
//       {
//         id: 1,
//         text: `Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.
// Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

// Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
// Return k.
// Custom Judge:

// The judge will test your solution with the following code:

// int[] nums = [...]; // Input array
// int[] expectedNums = [...]; // The expected answer with correct length

// int k = removeDuplicates(nums); // Calls your implementation

// assert k == expectedNums.length;
// for (int i = 0; i < k; i++) {
//     assert nums[i] == expectedNums[i];
// }
// If all assertions pass, then your solution will be accepted.`,
//         points: 10,
//         files: [],
//         testCases: [
//           {
//             id: 1,
//             input: "5\n2 3 4 4 4",
//             output: "4",
//           },
//           {
//             id: 2,
//             input: "3\n2 3 4",
//             output: "4",
//           },
//         ],
//       },
//       {
//         id: 2,
//         text: "Do something",
//         points: 5,
//         files: [],
//         testCases: [
//           {
//             id: 1,
//             input: "3\n1 2 3",
//             output: "3 2 1",
//           },
//         ],
//       },
//     ],
//   };
