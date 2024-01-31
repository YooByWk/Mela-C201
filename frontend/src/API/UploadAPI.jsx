import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Upload = () => {

    const onSubmit = async (e) => {
        e.preventDefault()
        e.persist()

        let files = e.target.profile_files.files;
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
    }

    const TOKEN_TYPE = localStorage.getItem("tokenType");
    let ACCESS_TOKEN = localStorage.getItem("accessToken");

    const postMusic = await axios({
        method: 'POST',
        url: 'http://localhost:8080/api/v1/users/musics',
        mode: 'cors',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        },
        data: FormData,
    })
}



