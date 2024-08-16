"use client";
import { Drawer, Snackbar } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Post | null>(null);
  useEffect(() => {
    fetch("http://localhost:3003/get-all-posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: localStorage.getItem("gdg_token"),
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("Login failed");
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="w-full max-w-[320px] shadow-md p-8">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLdMkscxEdGHevdxOWdnyRrDEQi6-mbD5PEA&s"
          className="size-8"
        />
        <p className="text-3xl font-bold w-[8ch] my-4">Disinfect The Bug</p>
        <div className="flex flex-col gap-4 py-8">
          <div className="py-4 px-6 rounded-lg bg-slate-500 text-white flex cursor-pointer">
            <span className="material-symbols-outlined">home</span>
            <p className="ml-4 font-medium">Home</p>
          </div>
          <div className="py-4 px-6 rounded-full flex cursor-pointer">
            <span className="material-symbols-outlined">home</span>
            <p className="ml-4">Interests</p>
          </div>
        </div>
      </div>
      <div className="grow p-4 px-8 overflow-scroll">
        <div className="w-full flex justify-end h-12 items-center mb-8">
          <span className="material-symbols-outlined cursor-pointer">
            search
          </span>
        </div>
        <div className="flex gap-8">
          <div
            className={
              selectedArticle == null
                ? "grid grid-cols-3"
                : "pr-8 border-r-[1px] grid grid-cols-1 shrink-0"
            }
          >
            {posts.map((post) => (
              <div
                onClick={() => {
                  setSelectedArticle(selectedArticle !== post ? post : null);
                }}
                className="h-[300px] shadow-lg w-max rounded-md"
              >
                <img
                  src={post.image}
                  className="w-[350px] h-[175px] object-cover"
                />
                <div className="p-4">
                  <p className="text-2xl font-medium">{post.title}</p>
                  <p className="mt-2">{post.Author.name}</p>
                  <p className="opaciy-60">17 August • 3 min read</p>
                </div>
              </div>
            ))}
          </div>
          {selectedArticle && (
            <div className="w-full grow">
              <img
                src={selectedArticle.image}
                className="w-full h-[280px] object-cover  rounded-lg overflow-clip"
              />
              <p className="mt-4 text-3xl font-bold">{selectedArticle.title}</p>
              <p>A playful dissection of functions</p>
              <div className="flex items-center gap-4 my-4">
                <img
                  src="https://github.com/android.png"
                  className="size-10 rounded-full"
                />
                <div>
                  <p>{selectedArticle.Author.name}</p>
                  <p>August 17 • 3 min read</p>
                  <Link
                    href={
                      selectedArticle.Author.twitter ??
                      "https://x.com/AndroidDev"
                    }
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
                      className="size-6 mt-2"
                    />
                  </Link>
                </div>
              </div>
              <p className="mt-3">{selectedArticle.content}</p>
            </div>
          )}
        </div>
      </div>
      <Snackbar
        open={isLoading}
        onClose={() => {
          setIsLoading(false);
        }}
        message="Loading..."
      />
    </div>
  );
}
