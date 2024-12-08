"use client";

import { IconBrandGithub } from "../icons";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { SocialMediaList } from "@/features/home/compoents/social-media";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { createSubscriber } from "@/lib/actions";
import { useActionState } from "react";
import { Wrapper } from "../wrapper";

import {
  Rss,
  Twitter,
  Command,
  ArrowRight,
  Icon as LucidIcon,
  LucideProps,
} from "lucide-react";

export const Footer = ({ lang }: { lang: string }) => {
  const initialState = { message: "", errors: {} };
  const [state, dispatch, isPending] = useActionState(createSubscriber, initialState);
  
  return (
    <footer className="px-6 pb-12 bg-gray-100">
      <Wrapper className="flex flex-col items-center justify-center space-y-1 pt-12 text-sm text-muted-foreground md:flex-row md:space-x-4 md:space-y-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 ">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Command className="h-6 w-6" />
                {/* <span className="text-md text-base font-semibold">{`Coding ${NICKNAME}`}</span> */}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Stay Up to Date with the latest news and insights from our blog.
              </p>
              <ul
                className={cn(
                  "flex space-x-4"
                )}
              >
                {/* <SocialMediaList lang={lang} delay={0}/> */}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-md font-semibold">Blog</h3>
              {/* <ul className="space-y-2 text-sm">
                {Object.entries(categories).map((item) => (
                  <li key={item[0]}>
                    <Link
                      href={item[1].href}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {item[0]}
                    </Link>
                  </li>
                ))}
              </ul> */}
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:w3tsadev@gmail.com"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <Link
                    href="/terms-of-services"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Terms of Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap.xml"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Newsletter</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Subscribe to our newsletter to stay up-to-date with the latest
                news and updates.
              </p>
              <form action={dispatch}>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="flex-1"
                    defaultValue=""
                    aria-describedby="email-error"
                  />
                  <Button type="submit" disabled={isPending}>Subscribe</Button>
                </div>
                <div
                  id="email-error"
                  aria-label="polite"
                  aria-atomic="true"
                  className="px-1"
                >
                  {state?.errors?.email &&
                    state.errors.email.map((error: string) => (
                      <p key={error} className="text-xs text-red-500">
                        {error}
                      </p>
                    ))}
                  {!state?.errors?.email && (
                    <p className="text-xs text-green-500">{state?.message}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
            &copy; 2024 Coding Jitsu. All rights reserved.
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};
