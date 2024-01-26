import { Song } from "@/types";

import usePlayer from "./usePlayer";
import useAuthModal from './useAuthModal';
import { useUser } from "./useUser";


const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const AuthModal = useAuthModal();
    const { user } = useUser();

    const onplay = (id: string) => {
        if (!user) {
            return AuthModal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((song) => song.id))
    }

    return onplay;
};

export default useOnPlay;