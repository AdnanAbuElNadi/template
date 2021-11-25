import React, { useState } from "react";

const MedianArrays = () => {
  const [nums1, setnums1] = useState([]);
  const [nums2, setnums2] = useState([]);
  var res = "";



  function handleChange(event) {
    event.preventDefault();
    var x = String(event.target.value);
    var nx = x.split(",");
    setnums1(nx);
    res = "";
  }

  function handleChange2(event) {
    event.preventDefault();
    var y = String(event.target.value);
    var yx = y.split(",");
    setnums2(yx);
    res = "";
  }

  function getRes(nums1, nums2) {
    var res2;
    var nums3 = nums1.concat(nums2);
    nums3.sort((a, b) => {
      return a - b;
    });
    var length = nums3.length;
    console.log(nums3);

    if (length % 2 == 0) {
      res2 = (Number(nums3[Math.floor(length / 2) - 1])  +  Number(nums3[Math.floor(length / 2)])) / 2;
    } else res2 = nums3[(length - 1) / 2];

    res = res2;
  }

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <input type="text" onChange={handleChange2} />
      <br />
      <button onClick={getRes(nums1, nums2)}>median</button>
      <br />
      <p id="output">{res}</p>
    </div>
  );
};
export default MedianArrays;
