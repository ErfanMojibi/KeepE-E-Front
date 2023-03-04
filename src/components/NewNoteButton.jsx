import { Button } from "@material-tailwind/react";
import {
  DocumentPlusIcon
} from "@heroicons/react/24/outline";

export default function NewNoteButton() {
  return (
    <Button className="flex items-center gap-2 w-40">
      <DocumentPlusIcon strokeWidth={2} className="h-6 w-6" /> New Note
    </Button>
  );
}
