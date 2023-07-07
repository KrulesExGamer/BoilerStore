export interface img {
    src : string,
    alt : string,
};

export interface dynImg {
    src : string,
    gif? : string | null,
    alt : string,
};

export interface asset {
    title : string, 
    type : string,
    description : string,
    imgs : dynImg[],

};