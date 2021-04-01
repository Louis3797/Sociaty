import React from "react";

export interface TextFieldProps {
  type: String;
  title: string;
}

const TextField: React.FC<TextFieldProps> = ({
  type,
  title,
}: TextFieldProps) => {
  return <input type="text" title={title}></input>;
};

export default TextField;
