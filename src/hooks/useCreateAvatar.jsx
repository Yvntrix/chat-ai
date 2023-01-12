import { initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useEffect, useState } from "react";

const useCreateAvatar = (seed) => {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    let active = true;

    (async () => {
      const avatar = await createAvatar(initials, {
        size: 128,
        seed: seed,
      }).toDataUri();

      if (active) {
        setAvatar(avatar);
      }
    })();

    return () => {
      active = false;
    };
  }, []);
  
  return [avatar];
};

export default useCreateAvatar;
