import React, { useRef, useState, useEffect } from "react";
import { Button, TextInput } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { updateImgUrl } from "../redux/user/userSlice";
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const tokenInfo = useRef(null); //访问token, tokenInfo.current.data.token
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("strategy_id", 2);
  /**监听文件改变 */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };
  /**上传图片 */
  const uploadImage = () => {
    const tokenFormData = new FormData();
    tokenFormData.append("email", "430296734@qq.com");
    tokenFormData.append("password", "slxnh14499588");

    fetch("/api/v1/tokens", {
      method: "POST",
      body: tokenFormData,
    })
      .then(async (res) => {
        const tokenObj = await res.json();
        tokenInfo.current = tokenObj.data.token;

        fetch("/api/v1/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${tokenInfo.current}`,
            Accept: "application/json",
          },
        })
          .then(async (response) => {
            const resJson = await response.json();
            // 更新数据库
            if (response.status == 200) {
              const imgKey = resJson.data.key;
              const profilePicture = resJson.data.links.url;
              dispatch(updateImgUrl(profilePicture));
              fetch("/api1/auth/updateImg", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  imgKey,
                  profilePicture,
                  email: "1212@qq.com",
                }),
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((err) => console.log(err));
  };
  /**渲染完成后上传 */
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          hidden
          ref={filePickerRef}
          onChange={handleFileChange}
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="username"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          autoComplete="off"
        />
        <Button type="submit" gradientMonochrome="cyan" outline="false">
          Update
        </Button>
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
