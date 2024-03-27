export const changeImages = ()=>{
    const currentTime = Date.now();
    const currentHours = new Date(currentTime).getHours();
    if (currentHours >= 0 && currentHours < 6) {
      return `0_1_2_3_4`
    } else if (currentHours >= 6 && currentHours < 12) {
        return `4_5_6_7_8`
    } else if (currentHours >= 12 && currentHours < 18) {
        return `8_9_0_1_2`
    } else {
        return `3_4_5_6_7`
    }
}