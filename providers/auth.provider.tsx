import {
  setLoadingInitialSession,
  setSession,
} from "@/store/slices/auth.slice";
import { useAppDispatch } from "@/store/store";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: any;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authCheck = async (url: string) => {
    const publicPaths = ["/login"];
    const path = url.split("?")[0];
    dispatch(setLoadingInitialSession(true));
    const currentSession = await getSession();
    if (currentSession) {
      dispatch(setSession(currentSession));
    }
    dispatch(setLoadingInitialSession(false));
    if (!currentSession?.user && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
      });
    } else {
      if (url === "/login" && currentSession) {
        router.push({
          pathname: "/",
        });
      }
      setAuthorized(true);
    }
  };

  return authorized && children;
};
