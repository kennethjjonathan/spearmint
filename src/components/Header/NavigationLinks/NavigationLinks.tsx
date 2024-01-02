import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import Link from "next/link";
import { linkSlide, menuSlide } from "../anim";
const navigationItems = [{ label: "Home", data: "/" }];

type NavigationLinksProps = {
  user: User | null;
};

const NavigationLinks = ({ user }: NavigationLinksProps) => {
  return (
    <motion.div
      layout
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed right-0 z-[99] flex h-screen w-4/5 items-center justify-center border-[1px] border-primary bg-foreground p-2 sm:w-1/5"
    >
      <div className="w-full space-y-10">
        <p className="text-sm text-accent lg:text-base">Where to?</p>
        <div className="flex flex-col items-start justify-start gap-5">
          {navigationItems.map((item, index) => (
            <motion.div
              custom={index}
              key={item.data}
              variants={linkSlide}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Link
                href={item.data}
                className="w-fit border-0 border-b-2 border-accent text-lg text-primary duration-300 lg:text-xl lg:hover:border-primary"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          {user ? (
            <motion.div
              custom={navigationItems.length + 1}
              variants={linkSlide}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Link
                href={`/${user.id}`}
                className="w-fit border-0 border-b-2 border-accent text-lg text-primary duration-300 lg:text-xl lg:hover:border-primary"
              >
                {user.user_metadata.username}
              </Link>
            </motion.div>
          ) : (
            <motion.div
              custom={navigationItems.length + 1}
              variants={linkSlide}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Link
                href={`/signin`}
                className="w-fit border-0 border-b-2 border-accent text-lg text-primary duration-300 lg:text-xl lg:hover:border-primary"
              >
                {"Sign In"}
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NavigationLinks;
