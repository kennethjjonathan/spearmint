import { SuggestionObject } from "@/interface/Home";

type SuggestionTabProps = {
  suggestionObject: SuggestionObject;
};
const SuggestionTab = ({ suggestionObject }: SuggestionTabProps) => {
  return (
    <button className="w-full rounded-md bg-accent p-1 text-foreground opacity-50 duration-300 focus:opacity-100 lg:hover:opacity-100">
      <p className="w-full text-left text-sm lg:text-base">
        {suggestionObject.title}
      </p>
      <p className="w-full text-left text-xs lg:text-sm">{`By ${suggestionObject.author}`}</p>
    </button>
  );
};

export default SuggestionTab;
