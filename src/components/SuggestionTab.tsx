import { SuggestionObject } from "@/interface/Home"

type SuggestionTabProps = {
  suggestionObject: SuggestionObject
}
const SuggestionTab = ({ suggestionObject }: SuggestionTabProps) => {
  return (
    <button className="w-full p-1 opacity-50 duration-300 hover:opacity-100 bg-accent">
      <p className="w-full text-left text-sm lg:text-base">{suggestionObject.title}</p>
      <p className="w-full text-left text-xs lg:text-sm">{`By ${suggestionObject.author}`}</p>
    </button>
  )
}

export default SuggestionTab