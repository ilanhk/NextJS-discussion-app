'use client';

import { useFormState } from "react-dom";
import { 
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@nextui-org/react";
import { createTopic } from "@/actions/create-topic";
import FormButton from "../common/FormButton";

export default function TopicCreateForm(){
  const [formState, action] = useFormState(createTopic, { errors: {} }); //2nd arg is form intial state need to have this argument in the server action for this to work The types need to match especially the return type on the server action
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Topic</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form action={ action }>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input 
              name="name" 
              label="Name" 
              labelPlacement="outside" 
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}
            />
            <Textarea
              name="description"  
              label="Description" 
              labelPlacement="outside" 
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />

            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(', ')}
              </div>
            ) : null}

            <FormButton>Save</FormButton>
          </div>
        </form>
      </PopoverContent>

    </Popover>
  );
};

//labelPlacement="outside" affects the styling of where the label gets placed
// name="description" - need name prop for server action functions to collect data submitted
// !!formState.errors.name this will turn a boolean answer to see if its true or false
// .join(', ') to join items in an array together in a string with a comma and a space