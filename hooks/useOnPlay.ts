import { Song } from "@/types";

import usePlayer from "./usePlayer";
import useAuthModal from './useAuthModal';
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";


const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const subscribeModal = useSubscribeModal();
    const AuthModal = useAuthModal();
    const { user, subscription } = useUser();

    const onplay = (id: string) => {
        if (!user) {
            return AuthModal.onOpen();
        }

        if (!subscription) {
            return subscribeModal.onOpen();
          }

        player.setId(id);
        player.setIds(songs.map((song) => song.id))
    }

    return onplay;
};

export default useOnPlay;