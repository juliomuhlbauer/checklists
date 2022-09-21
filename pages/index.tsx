import { NextPage } from "next";
import dynamic from "next/dynamic";

const Layout = dynamic<{}>(
  () => import("@/components/habits-layout").then((mod) => mod.HabitsLayout),
  {
    ssr: false,
  }
);

export const HabitsPage: NextPage = () => {
  return <Layout />;
};

export default HabitsPage;
