"use server";

export const parseStatement = async (file: File) => {
  try {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.NEXT_PUBLIC_PARSER_API_KEY}`);

    let formData = new FormData();
    formData.append("files", file, "file");
    formData.append("timeout", "300");
    formData.append("include_metadata", "false");

    let requestOptions = {
      method: "POST",
      body: formData,
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    const response = await fetch(
      "https://us-central.unstract.com/deployment/api/org_ig2QWLaJzLuhWVVM/bank_statement_parser/",
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error parsing receipt:", error);
    return null;
  }
};
