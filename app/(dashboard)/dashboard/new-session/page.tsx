"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

interface TestCase {
  id: number;
  input: string;
  output: string;
}

interface Question {
  id: number;
  text: string;
  points: number;
  files: File[];
  testCases: TestCase[];
}

interface SessionData {
  title: string;
  questions: Question[];
  time: number;
  semester: string;
  batch: string;
}

const Page = () => {
  const [sessionData, setSessionData] = useState<SessionData>({
    title: "Enter Title",
    questions: [
      {
        id: 1,
        text: "",
        points: 0,
        files: [],
        testCases: [
          {
            id: 1,
            input: "",
            output: "",
          },
        ],
      },
    ],
    time: 0,
    semester: "",
    batch: "",
  });

  const removeQuestion = (questionId: number) => {
    setSessionData((prevData) => ({
      ...prevData,
      questions: prevData.questions.filter((q) => q.id !== questionId),
    }));
  };

  const handleFileUpload = (files: File[], questionId: number) => {
    setSessionData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.id === questionId ? { ...q, files: [...q.files, ...files] } : q
      ),
    }));
    console.log(`Files for Question ${questionId}:`, files);
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: sessionData.questions.length + 1,
      text: "",
      points: 0,
      files: [],
      testCases: [
        {
          id: 1,
          input: "",
          output: "",
        },
      ],
    };
    setSessionData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, newQuestion],
    }));
  };

  const addTestCase = (questionId: number) => {
    setSessionData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) => {
        if (q.id === questionId) {
          const newTestCase: TestCase = {
            id: q.testCases.length + 1,
            input: "",
            output: "",
          };
          return { ...q, testCases: [...q.testCases, newTestCase] };
        }
        return q;
      }),
    }));
  };

  const handleQuestionTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    questionId: number
  ) => {
    const { value } = e.target;
    setSessionData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.id === questionId ? { ...q, text: value } : q
      ),
    }));
  };

  const handleQuestionPointsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: number
  ) => {
    const { value } = e.target;
    const points = parseInt(value) || 0;
    setSessionData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.id === questionId ? { ...q, points } : q
      ),
    }));
  };

  const handleTestCaseChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    questionId: number,
    testCaseId: number,
    field: "input" | "output"
  ) => {
    const { value } = e.target;
    setSessionData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) => {
        if (q.id === questionId) {
          const updatedTestCases = q.testCases.map((tc) =>
            tc.id === testCaseId ? { ...tc, [field]: value } : tc
          );
          return { ...q, testCases: updatedTestCases };
        }
        return q;
      }),
    }));
  };

  const handleSessionDataChange = (
    field: "title" | "time" | "semester" | "batch",
    value: string | number
  ) => {
    setSessionData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const publishTask = async () => {
    console.log("Task Published", sessionData);
    // Implement your publish logic here, e.g., sending data to a server
    try {
      const user = localStorage.getItem("id");
      const response = await axios.post(
        "http://localhost:8000/api/v1/new-session",
        { sessionData, user }
      );
      console.log(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-4">
      {/* Title Dialog */}
      <Dialog>
        <DialogTrigger>
          <p className="text-4xl text-secondary font-semibold flex items-center gap-2 hover:cursor-pointer">
            {sessionData.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"></path>
            </svg>
          </p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Session Title</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter Title"
            value={sessionData.title}
            onChange={(e) => handleSessionDataChange("title", e.target.value)}
          />
          <DialogClose asChild>
            <Button className="mt-4">Save</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Questions Section */}
      {sessionData.questions.map((question, qIndex) => (
        <div key={question.id} className="my-8">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">Task {question.id}</p>
            {question.id !== 1 ? (
              <Button
                className="text-white"
                variant="destructive"
                onClick={() => removeQuestion(question.id)}
              >
                Remove Task
              </Button>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Question</label>
            <textarea
              value={question.text}
              onChange={(e) => handleQuestionTextChange(e, question.id)}
              className="border border-secondary rounded-md resize-none p-4 w-full h-40 text-lg"
              placeholder="Enter your question here..."
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              Upload Files
            </label>
            <FileUpload
              onChange={(files) => handleFileUpload(files, question.id)}
            />
            {question.files.length > 0 && (
              <ul className="mt-2 list-disc list-inside">
                {question.files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4 flex items-center gap-2">
            <label className="text-lg font-medium">Points:</label>
            <Input
              type="number"
              value={question.points}
              onChange={(e) => handleQuestionPointsChange(e, question.id)}
              className="w-20 bg-white border-secondary"
              min="0"
            />
          </div>

          <div className="mb-4">
            <p className="text-lg font-medium mb-2">Test Cases</p>
            {question.testCases.map((testCase, tcIndex) => (
              <div key={testCase.id} className="mb-4">
                <p className="">Test Case {testCase.id}</p>
                <div className="mt-2">
                  <label className="block text-md mb-1">Input:</label>
                  <textarea
                    value={testCase.input}
                    onChange={(e) =>
                      handleTestCaseChange(e, question.id, testCase.id, "input")
                    }
                    className="border border-secondary rounded-md resize-none p-2 w-full h-24 text-md"
                    placeholder="Enter test case input..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-md mb-1">Output:</label>
                  <textarea
                    value={testCase.output}
                    onChange={(e) =>
                      handleTestCaseChange(
                        e,
                        question.id,
                        testCase.id,
                        "output"
                      )
                    }
                    className="border border-secondary rounded-md resize-none p-2 w-full h-24 text-md"
                    placeholder="Enter expected output..."
                  ></textarea>
                </div>
              </div>
            ))}

            <Button onClick={() => addTestCase(question.id)} className="mt-2">
              Add Test Case
            </Button>
          </div>
        </div>
      ))}

      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="flex items-center w-full gap-2">
          <div className="border-b border-secondary bg-black w-full"></div>
          <Button onClick={addQuestion} className="">
            Add Question
          </Button>
          <div className="border-b border-secondary bg-black w-full"></div>
        </div>
        <div className="flex items-center justify-end w-full">
          <Dialog>
            <DialogTrigger>
              <Button className="text-white bg-accent px-8">Publish</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Session Details</DialogTitle>
              </DialogHeader>
              <Input
                type="number"
                placeholder="Time(in minutes)"
                value={sessionData.time}
                onChange={(e) =>
                  handleSessionDataChange("time", parseInt(e.target.value) || 0)
                }
              />
              <Select
                value={sessionData.semester}
                onValueChange={(value) =>
                  handleSessionDataChange("semester", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={sessionData.batch}
                onValueChange={(value) =>
                  handleSessionDataChange("batch", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Batch" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((batch) => (
                    <SelectItem key={batch} value={batch.toString()}>
                      Batch {batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DialogClose asChild>
                <Button className="mt-4" onClick={publishTask}>
                  Save
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Page;
