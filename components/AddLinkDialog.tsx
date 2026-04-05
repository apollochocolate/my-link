"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconPlus } from "@tabler/icons-react";

interface AddLinkDialogProps {
  onAddLink: (title: string, url: string) => void;
}

export function AddLinkDialog({ onAddLink }: AddLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    // Automatically prepend https:// if missing as per PRD
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    onAddLink(title, formattedUrl);
    
    // Reset form and close dialog
    setTitle("");
    setUrl("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          <Button className="group w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 hover:from-indigo-600 to-violet-500 hover:to-violet-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 gap-2">
            <IconPlus size={20} stroke={2.5} className="transition-transform duration-300 group-hover:rotate-90" />
            <span className="font-semibold text-[15px]">새로운 링크 추가</span>
          </Button>
        } 
      />
      <DialogContent className="sm:max-w-[425px] rounded-2xl dark:border-zinc-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl">새 링크 추가</DialogTitle>
            <DialogDescription>
              아래 폼을 입력하여 새로운 링크 버튼을 추가하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-6">
            <div className="grid gap-2">
              <Label htmlFor="title">표시할 제목 (Title)</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 내 포트폴리오"
                className="h-11 dark:border-zinc-700"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">주소 (URL)</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="예: https://example.com"
                className="h-11 dark:border-zinc-700"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="h-11 rounded-lg">
              취소
            </Button>
            <Button type="submit" className="h-11 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white">
              추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
