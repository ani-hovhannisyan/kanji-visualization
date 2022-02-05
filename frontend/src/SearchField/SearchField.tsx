import React, { JSXElementConstructor, useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { kanjiInfo, graphInfo } from "../App";

import { useForm, SubmitHandler } from "react-hook-form";

type kanjiVisualizeResponse = {
  kanji: kanjiInfo;
  graph: graphInfo;
};

type Props = {
  setKanji: any;
  setGraph: any;
};

type Inputs = {
  kanji: string;
};

const SearchField = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/kanji-visualize`,
        { data }
      )
      .then((res: AxiosResponse<kanjiVisualizeResponse>) => {
        const { data, status } = res;
        console.log(status);
        props.setKanji(data.kanji);
        props.setGraph(data.graph);
      })
      .catch((error: AxiosError<any>) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("kanji")} />

      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
};

export default SearchField;
