import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type TeamProps = SliceComponentProps<Content.TeamSlice>;

const Team: FC<TeamProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white py-12 px-6 lg:py-24 lg:px-40"
      id="team"
    >
      <div className="container mx-auto">
        {/* Titolo */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {slice.primary.title}
        </h2>

        {/* Grid membri team */}
        <div className="grid grid-cols-2 gap-8 lg:flex lg:justify-center lg:flex-wrap lg:gap-12">
          {slice.items.map((member, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <Avatar className="w-20 h-20 md:w-32 md:h-32 border border-primary">
                <AvatarImage
                  src={member.avatar.url || ""}
                  alt={member.name || ""}
                  className="object-cover object-top"
                />
                <AvatarFallback className="text-xl md: text-2xl">
                  {member.name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="text-center flex flex-col items-center">
                <h3 className="text-xl font-bold h-14 flex items-center justify-center">
                  {member.name}
                </h3>
                <p className="text-primary uppercase text-sm font-extrabold">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
