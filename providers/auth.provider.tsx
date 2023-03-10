import {
  setLoadingInitialSession,
  setSession,
} from "@/store/slices/auth.slice";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store";

interface AuthProviderProps {
  children: any;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [pathToNavigate, setPathToNavigate] = useState<
    string | null | undefined
  >(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathToNavigate && pathToNavigate !== router.asPath) {
      router.push(pathToNavigate);
      return () => {
        setPathToNavigate(null);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathToNavigate, router.asPath]);

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
      setPathToNavigate("/login");
    } else {
      if (url === "/login" && currentSession) {
        setPathToNavigate("/");
      }
      setAuthorized(true);
    }
  };

  return authorized && children;
};
