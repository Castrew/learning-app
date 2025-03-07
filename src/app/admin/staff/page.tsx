//here the member will be shown

import { Box } from "@mui/material";
import MemberCard from "src/components/MemberCard";
import CreateUpdateMember from "src/components/CreateUpdateMember";

const AdminMemberPage = () => {
  return (
    <Box>
      <CreateUpdateMember />
      <MemberCard />
    </Box>
  );
};

export default AdminMemberPage;
