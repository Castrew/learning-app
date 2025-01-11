"use client";
import { useGetAllStaff } from "src/app/core/react-query/staff/hooks/useGetAllStaff";
import { Staff } from "src/app/core/react-query/staff/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import marsi from "../../public/marsi.png";
import dimoff from "../../public/dimoff.png";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteStaff } from "src/app/core/react-query/staff/hooks/useDeleteStaff";
import { usePathname, useRouter } from "next/navigation";
import ClearIcon from "@mui/icons-material/Clear";
import { toasts } from "./Toast";
import { useSession } from "next-auth/react";

const MemberCard = () => {
  const [open, setOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Staff | null>(null);

  const { data: staff, isLoading } = useGetAllStaff();
  const deleteMember = useDeleteStaff();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isActionAllowed =
    session?.user.id === "yvli5wewb2blxy5" && pathname.includes("/admin/staff");
  const showTreatments =
    pathname.includes("/admin/staff") || pathname.includes("/staff");

  const handleDeleteMember = (data: string) => {
    deleteMember.mutate(
      { staffId: data },
      {
        onSuccess: () => {
          toasts.Success("Member has been succefuly deleted!");
          setOpen(!open);
        },
        onError: (error) => {
          toasts.Error(error);
        },
      }
    );
  };

  if (isLoading) {
    return "Loading";
  }

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      {staff.map((member: Staff, index: number) => {
        return (
          <Card
            key={member.id}
            sx={{
              m: 2,
              p: 2,
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Image
              src={index === 0 ? marsi : dimoff}
              width={isMobile ? 200 : 300}
              height={isMobile ? 250 : 350}
              alt={index === 0 ? "marsi" : "dimoff"}
            />
            {isActionAllowed && (
              <IconButton
                onClick={() => {
                  {
                    setOpen(!open);
                    setMemberToDelete(member);
                  }
                }}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            )}
            <Modal open={open}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: isMobile ? "90%" : 500,
                  bgcolor: "background.paper",
                  border: "1px solid #000",
                  borderRadius: 10,
                  boxShadow: 24,
                  p: 2,
                }}
              >
                <DialogTitle
                  variant="h5"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pr: 1, fontSize: 20, fontWeight: "bold" }}
                >
                  Confirmation
                  <IconButton
                    aria-label="close-modal"
                    onClick={() => setOpen(!open)}
                  >
                    <ClearIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <Typography>
                    Are you sure that you want to remove this member?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    sx={{ borderRadius: "20px" }}
                    onClick={() => setOpen(!open)}
                  >
                    Close modal
                  </Button>
                  <Button
                    sx={{ borderRadius: "20px" }}
                    variant="contained"
                    onClick={() =>
                      handleDeleteMember(
                        memberToDelete ? memberToDelete.id : ""
                      )
                    }
                  >
                    Remove
                  </Button>
                </DialogActions>
              </Box>
            </Modal>

            {isActionAllowed && (
              <IconButton
                onClick={() => router.push(`/admin/staff/${member.id}`)}
                sx={{ position: "absolute", top: 0, right: 40 }}
              >
                <EditIcon />
              </IconButton>
            )}
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={isMobile ? "center" : "left"}
                fontFamily="cursive"
              >
                {member.name}
              </Typography>
              {showTreatments && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign={isMobile ? "center" : "left"}
                >
                  Treatments:
                </Typography>
              )}
              {showTreatments && (
                <List>
                  {member.treatments?.map((treatment) => (
                    <Box key={treatment.id}>
                      <ListItem>
                        <Typography>{treatment.title}</Typography>
                      </ListItem>
                      <Divider />
                    </Box>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default MemberCard;
