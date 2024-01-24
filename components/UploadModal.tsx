"use client";

import uniqid from "uniqid";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { cache, useState } from "react";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const UploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      img: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      UploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Please check the missing fields");
        return;
      }

      const uniqueId = uniqid();

      // Upload songs
      const {
        data: songData,
        error: songError,
      } = await supabaseClient
        .storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
        cacheControl: "3600",
        upsert: false
      });

      if (songError) {
        setIsLoading(false);
        return toast.error("Song upload failed");
      }

      // Upload image
      const {
        data: imageData,
        error: imageError,
      } = await supabaseClient
        .storage
        .from("images")
        .upload(`image-${values.title}-${uniqueId}`, imageFile, {
        cacheControl: "3600",
        upsert: false
      });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Image upload failed");
      }

      const {
        error: supabaseError
      } = await supabaseClient
          .from("songs")
          .insert({
            user_id: user.id,
            title: values.title,
            author: values.author,
            img_path: imageData.path,
            song_path: songData.path
          });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded successfully");
      reset();
      UploadModal.onClose();

    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
        title="Add a song"
        description="Upload mp3 files to add them to your library"
        isOpen={UploadModal.isOpen}
        onChange={onChange}
    >
      <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", {required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", {required: true })}
          placeholder="Song author"
        />
          <div>
            <div className="pb-1">
              Select a song
            </div>
            <Input
              id="song"
              type="file"
              disabled={isLoading}
              {...register("song", {required: true })} 
              accept=".mp3"
            />
          </div>
          <div>
            <div className="pb-1">
              Select a song cover 
            </div>
            <Input
              id="image"
              type="file"
              disabled={isLoading}
              {...register("image", {required: true })} 
              accept="image/*"
            />
          </div>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
      </form>
    </Modal>
  )
};

export default UploadModal;
function useSupabase() {
  throw new Error("Function not implemented.");
}

