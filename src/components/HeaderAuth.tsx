'use client';

//created this component to make this component static not dynamic
import { 
  NavbarItem,
  Input,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent, 
} from "@nextui-org/react";
import { useSession } from "next-auth/react"; // doesnt access cookies directly thats why not dynamic
import * as actions from "@/actions/serverActions";

export default function HeaderAuth() {

  const session = useSession();

  let authContent: React.ReactNode;

  if(session.status === "loading"){
    authContent = null;
  } else if (session.data?.user){
    authContent = (
      <Popover placement="right">
        <PopoverTrigger>
          <Avatar src={session.data.user.image || ''} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">Sign In</Button>
          </form>
        </NavbarItem>

        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">Sign Up</Button> 
          </form>
        </NavbarItem>
      </>
    );
  };

  return authContent;
}

