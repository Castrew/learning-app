"use client";

import { Box, Button, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateTreatment } from "@/app/core/react-query/treatments/hooks/useUpdateTreatment";
import { useRouter, useParams } from "next/navigation";
import { useGetOneTreatment } from "@/app/core/react-query/treatments/hooks/useGetOneTreatment";
import CreateUpdateTreatment from "@/components/CreateUpdateTreatment";

type AdminUpdateTreatmentPageProps = {
  treatmentId: string;
  title: string;
  duration: string;
  price: string;
  description: string;
};

const AdminUpdateTreatmentPage = () => {
  // const router = useRouter();
  // const params = useParams();
  // const treatmentId = String(params.treatmentId);
  // const updateTreatment = useUpdateTreatment();

  // const { data, isLoading } = useGetOneTreatment({ treatmentId });
  // const treatment = data?.data[0];

  // const defaultValues = {
  //   title: treatment?.title,
  //   duration: treatment?.duration,
  //   price: treatment?.price,
  //   description: treatment?.description,
  // };

  // const { register, handleSubmit, reset } = useForm({
  //   defaultValues,
  // });
  // const onSubmit: SubmitHandler<AdminUpdateTreatmentPageProps> = (data) => {
  //   updateTreatment.mutate({ treatmentId: treatment?.id, ...data });
  // };

  // useEffect(() => {
  //   reset({
  //     title: treatment?.title,
  //     duration: treatment?.duration,
  //     price: treatment?.price,
  //     description: treatment?.description,
  //   });
  // }, [
  //   treatment?.treatment,
  //   treatment?.email,
  //   treatment?.price,
  //   treatment?.description,
  // ]);

  return (
    <Box>
      <CreateUpdateTreatment />
    </Box>
  );
};

export default AdminUpdateTreatmentPage;
