import clsx from "clsx";
import Bounded from "../Bounded";
import AnimatedContent from "./AnimatedContent";
import ButtonLink from "../ButtonLink";
import Image from "next/image";
import { MessageSquareIcon, Newspaper } from "lucide-react";
import {
  FaLightbulb,
  FaChartLine,
  FaUsers,
  FaBalanceScale,
  FaGift,
} from "react-icons/fa";

const Showcase = (): JSX.Element => {
  return (
    <Bounded className="relative z-10">
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/20 blur-3xl filter" />

      <AnimatedContent>
        <h2 className="text-heading3-semibold text-balance text-center md:text-heading2-semibold">
          Why Join Us?
        </h2>
      </AnimatedContent>
      <div className="mt-16 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5  backdrop-blur-sm  ">
        <div className="grid gap-8 px-8 py-8 text-slate-500 lg:grid-cols-3 lg:gap-8 lg:py-12">
          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <FaLightbulb className="text-heading4-bold text-blue-500" />
            <h4 className="mt-4 text-large-semibold">Innovative Environment</h4>
            <p className="mt-2 text-center">
              Work on cutting-edge projects that push the boundaries of
              technology and creativity.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <FaChartLine className="text-heading4-bold text-blue-500" />
            <h4 className="mt-4 text-large-semibold">Professional Growth</h4>
            <p className="mt-2 text-center">
              We invest in your future with continuous learning opportunities,
              mentorship programs, and career advancement paths.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <FaUsers className="text-heading4-bold text-blue-500" />
            <h4 className="mt-4 text-large-semibold">Collaborative Culture</h4>
            <p className="mt-2 text-center">
              Join a team of talented, diverse, and driven individuals who are
              dedicated to making a difference.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <FaBalanceScale className="text-heading4-bold text-blue-500" />
            <h4 className="mt-4 text-large-semibold">Work-Life Balance</h4>
            <p className="mt-2 text-center">
              Enjoy flexible working hours, remote work options, and a
              supportive environment that values your well-being.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <FaGift className="text-heading4-bold text-blue-500" />
            <h4 className="mt-4 text-large-semibold">Competitive Benefits</h4>
            <p className="mt-2 text-center">
              Receive a comprehensive benefits package, including health
              insurance, retirement plans, and performance bonuses.
            </p>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Showcase;
