import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions,
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions,
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions,
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatPrice = (price: string) => {
  const amount = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return formattedPrice;
};

export const handleError = (error: unknown) => {
  console.error(error);
  // throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

// create isBase64 function
export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

// create function receive _creationTime as agument and return created time as "1 hour ago", "1 day ago","20 Dec 2020" etc
export const createdTime = (time: number) => {
  const now = new Date().getTime();
  const diff = now - time;
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30;
  const years = months / 12;
  if (seconds < 60) return `${Math.floor(seconds)} seconds ago`;
  if (minutes < 60) return `${Math.floor(minutes)} minutes ago`;
  if (hours < 24) return `${Math.floor(hours)} hours ago`;
  if (days < 30) return `${Math.floor(days)} days ago`;
  if (months < 12) return `${Math.floor(months)} months ago`;
  return `${Math.floor(years)} years ago`;
};

export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number,
) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      if (ctx) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(
            new File([blob!], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            }),
          );
        }, "image/jpeg");
      }
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export const generateRandomEmployee = () => {
  const names = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Carol King",
    "Dave Wilson",
    "Eva Green",
    "Frank Moore",
    "Grace Hall",
    "Henry White",
  ];
  const positions = [
    "Software Engineer",
    "Product Manager",
    "UI/UX Designer",
    "Data Scientist",
    "DevOps Engineer",
    "Project Manager",
    "Backend Developer",
    "Frontend Developer",
    "Cybersecurity Specialist",
    "Mobile Developer",
  ];
  const levels = ["Junior", "Mid-Level", "Senior"];
  const departments = [
    "Engineering",
    "Product",
    "Design",
    "Data",
    "Operations",
    "Management",
    "Development",
    "Security",
    "Mobile",
  ];
  const statuses = ["Active", "Inactive", "On Leave"];
  const genders = ["Male", "Female", "Other"];

  const getRandomElement = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];
  const getRandomDate = (start: Date, end: Date) =>
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );

  const name = getRandomElement(names);
  const email = `${name.toLowerCase().replace(" ", ".")}@example.com`;
  const birthDate = getRandomDate(new Date(1970, 0, 1), new Date(2000, 11, 31))
    .toISOString()
    .split("T")[0];
  const hiredDate = getRandomDate(new Date(2015, 0, 1), new Date(2022, 11, 31))
    .toISOString()
    .split("T")[0];
  const endDate =
    Math.random() > 0.5
      ? getRandomDate(new Date(2023, 0, 1), new Date(2025, 11, 31))
          .toISOString()
          .split("T")[0]
      : null;
  const phone = `+${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const address = `${Math.floor(Math.random() * 1000)} Main St, City, State, ZIP`;
  const gender = getRandomElement(genders);
  const position = getRandomElement(positions);
  const level = getRandomElement(levels);
  const department = getRandomElement(departments);
  const status = getRandomElement(statuses);
  const image = `https://example.com/${name.toLowerCase().replace(" ", "_")}.jpg`;

  return {
    image,
    name,
    email,
    birthDate,
    phone,
    gender,
    address,
    position,
    level,
    department,
    hired_date: hiredDate,
    end_date: endDate,
    status,
  };
};

export function get_tax_level(tntt: number): number {
  if (tntt <= 0) {
    return 0;
  } else if (tntt <= 5000000) {
    return (tntt * 5) / 100;
  } else if (tntt <= 10000000) {
    return (tntt * 10) / 100 - 250000;
  } else if (tntt <= 18000000) {
    return (tntt * 15) / 100 - 750000;
  } else if (tntt <= 32000000) {
    return (tntt * 20) / 100 - 1650000;
  } else if (tntt <= 52000000) {
    return (tntt * 25) / 100 - 3250000;
  } else if (tntt <= 80000000) {
    return (tntt * 30) / 100 - 5850000;
  } else {
    return (tntt * 35) / 100 - 9850000;
  }
}
