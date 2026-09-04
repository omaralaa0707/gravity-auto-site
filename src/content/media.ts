/**
 * Every car Gravity Auto post is photographed in the same spot: their own
 * forecourt, under a backlit "GRAVITY AUTO" sign on a graphite concrete
 * box. Four cars were sourced from their last twelve posts — each one
 * posted three separate times, with different frames each time, which is
 * why twelve posts yield exactly four listings here.
 */

export type FleetId = "sealion" | "xc60" | "c180" | "bmw235";

export type FleetCar = {
  id: FleetId;
  marque: string;
  model: string;
  year: string;
  frames: string[];
  postUrls: string[];
};

const post = (code: string) => `https://www.instagram.com/p/${code}/`;
const f = (s: string) => [`/media/${s}-1.jpg`, `/media/${s}-2.jpg`, `/media/${s}-3.jpg`];

/** As posted, newest first. */
export const FLEET: FleetCar[] = [
  {
    id: "sealion",
    marque: "BYD",
    model: "Sealion 06",
    year: "2026",
    frames: f("sealion"),
    postUrls: [post("Dc0_NOHjKh9"), post("Dc0-ylpjIRK"), post("Dc0-VGnjFPL")],
  },
  {
    id: "xc60",
    marque: "Volvo",
    model: "XC60",
    year: "2026",
    frames: f("xc60"),
    postUrls: [post("Db-0UVBjN2R"), post("Db-0MvBDA-9"), post("Db-0AkBDKBu")],
  },
  {
    id: "bmw235",
    marque: "BMW",
    model: "235 Gran Coupe",
    year: "2024",
    frames: f("bmw235"),
    postUrls: [post("DbiQhrZjGZ1"), post("DbiQTa8DL4l"), post("DbiQEsvjK-R")],
  },
  {
    id: "c180",
    marque: "Mercedes-Benz",
    model: "C180 AMG Line",
    year: "2024",
    frames: f("c180"),
    postUrls: [post("DbDdWuxDLMa"), post("DbDdDzIjEGj"), post("DbDc8h9DONt")],
  },
];

export const PROFILE = {
  instagram: "https://www.instagram.com/gravityauto.eg/",
  facebook: "https://www.facebook.com/gravityauto.eg",
  maps: "https://www.google.com/maps/place/Gravity+Auto/data=!4m2!3m1!1s0x0:0x70e7b8606bb1fe3c",
  mainPhone: "01066666162",
  mainPhoneHref: "tel:+201066666162",
  address: "Chill Out, Waslet Dahshour, opposite the Zayed 3 entrance, Sheikh Zayed",
  addressAr: "تشيل أوت، وصلة دهشور، أمام مدخل زايد 3، الشيخ زايد",
  followers: "207",
  posts: "375",
} as const;
