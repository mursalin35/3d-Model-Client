import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModelCard } from "../../components/ModelCard";

const MyDownloads = () => {
  const { user } = use(AuthContext);
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch(
      `https://3d-model-server-alpha.vercel.app/my-downloads?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setModels(data);
      });
  }, [user, setModels]);

  return (
    <div className="w-11/12 mx-auto">
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {models.map((model) => (
          <ModelCard key={model._id} model={model}></ModelCard>
        ))}
      </div>
    </div>
  );
};

export default MyDownloads;
