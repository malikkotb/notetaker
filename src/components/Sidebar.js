import {
  Typography,
  List,
  ListItem,
  //   ListItemPrefix,
  ListItemSuffix,
  Chip,
  
} from "@material-tailwind/react";
// import {
//   PresentationChartBarIcon,
//   ShoppingBagIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
//   InboxIcon,
//   PowerIcon,
// } from "@heroicons/react/24/solid";

function Sidebar() {
  return (
    <main>
      {/* <Card className="h-screen w-full shadow-xl shadow-blue-gray-900/5"> */}
      <div className="mb-2 p-4">
        <Typography
          className="text-center text-white"
          variant="h5"
          color="blue-gray"
        >
          NoteTaker
        </Typography>
      </div>

      <List className="min-w-0 w-full text-white">
        {/* <Button className="text-white text-left" variant="text">Button</Button> */}

        <ListItem className="text-white">
          {/* <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix> */}
          Dashboard
        </ListItem>
        <ListItem>
          {/* <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix> */}
          E-Commerce
        </ListItem>
        <ListItem>
          {/* <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix> */}
          Inbox
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          {/* <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix> */}
          Profile
        </ListItem>
        <ListItem>
          {/* <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix> */}
          Settings
        </ListItem>
        <ListItem>
          {/* <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix> */}
          Log Out
        </ListItem>
      </List>

      {/* </Card> */}
    </main>
  );
}

export default Sidebar;
