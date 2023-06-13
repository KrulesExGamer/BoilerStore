export enum GameGenre {
    ActionAdventure = 'ACTION-ADVENTURE',
    RolePlaying = 'ROLE-PLAYING',
    Strategy = 'STRATEGY',
    Simulation = 'SIMULATION',
    Sports = 'SPORTS',
    Racing = 'RACING',
    Puzzle = 'PUZZLE',
    Platformer = 'PLATFORMER',
    Fighting = 'FIGHTING',
    Stealth = 'STEALTH',
    Survival = 'SURVIVAL',
    Horror = 'HORROR',
    OpenWorld = 'OPEN-WORLD',
    Sandbox = 'SANDBOX',
    MMORPG = 'MMORPG',
    MOBA = 'MOBA',
    Card = 'CARD',
    Adventure = 'ADVENTURE',
    Music = 'MUSIC',
    VisualNovel = 'VISUAL-NOVEL',
    BulletHell = 'BULLET-HELL',
    FPS = 'FPS',
}

const GAME_GENRE_MAP: Record<string, GameGenre> = {
    'ACTION-ADVENTURE': GameGenre.ActionAdventure,
    'ROLE-PLAYING': GameGenre.RolePlaying,
    'STRATEGY': GameGenre.Strategy,
    'SIMULATION': GameGenre.Simulation,
    'SPORTS': GameGenre.Sports,
    'RACING': GameGenre.Racing,
    'PUZZLE': GameGenre.Puzzle,
    'PLATFORMER': GameGenre.Platformer,
    'FIGHTING': GameGenre.Fighting,
    'STEALTH': GameGenre.Stealth,
    'SURVIVAL': GameGenre.Survival,
    'HORROR': GameGenre.Horror,
    'OPEN-WORLD': GameGenre.OpenWorld,
    'SANDBOX': GameGenre.Sandbox,
    'MMORPG': GameGenre.MMORPG,
    'MOBA': GameGenre.MOBA,
    'CARD': GameGenre.Card,
    'ADVENTURE': GameGenre.Adventure,
    'MUSIC': GameGenre.Music,
    'VISUAL-NOVEL': GameGenre.VisualNovel,
    'BULLET-HELL': GameGenre.BulletHell,
    'FPS': GameGenre.FPS,
};

export function parseGameGenre(gameGenreStr: string): GameGenre | undefined {
    const normalizedGameGenreStr = gameGenreStr.trim().toUpperCase();
    return GAME_GENRE_MAP[normalizedGameGenreStr];
}

export interface GameGenreData {
    name: string,
    key: GameGenre,
    icon: string,
    description: string,
    examples: string[],
}

export enum AssetType {
    Image = 'IMAGE',
    Video = 'VIDEO',
    Music = 'MUSIC',
    SFX = 'SFX',
    VFX = 'VFX',
    Model = 'MODEL',
    Texture = 'TEXTURE',
    TexturizedModel = 'TEXTURIZED-MODEL',
    Sprite = 'SPRITE',
    Animation = 'ANIMATION',
}

const ASSET_TYPE_MAP: Record<string, AssetType> = {
    'IMAGE': AssetType.Image,
    'VIDEO': AssetType.Video,
    'MUSIC': AssetType.Music,
    'SFX': AssetType.SFX,
    'VFX': AssetType.VFX,
    'MODEL': AssetType.Model,
    'TEXTURE': AssetType.Texture,
    'TEXTURIZED-MODEL': AssetType.TexturizedModel,
    'SPRITE': AssetType.Sprite,
    'ANIMATION': AssetType.Animation
};

export function parseAssetType(assetTypeStr: string): AssetType | undefined {
    const normalizedAssetTypeStr = assetTypeStr.trim().toUpperCase();
    return ASSET_TYPE_MAP[normalizedAssetTypeStr];
}

export interface AssetTypeData {
    name: string,
    key: AssetType,
    icon: string,
    description: string,
    examples: string[],
}

export interface ImgData {
    url: string,
    description: string,
    darkImage?: boolean,
}

export interface DynamicImg {
    static: ImgData,
    dynamic: ImgData | null,
}

export function createDynamicImg (args : {
    staticUrl: string,
    staticDescription: string,
    staticDarkImage?: boolean,

    dynamicUrl?: string | null,
    dynamicDescription?: string | null,
    dynamicDarkImage?: boolean,
}) : DynamicImg {
    return {
        static: {
            url: args.staticUrl,
            description: args.staticDescription,
            darkImage: args.staticDarkImage,
        },
        dynamic: args.dynamicUrl ? {
            url: args.dynamicUrl,
            description: args.dynamicDescription ?? args.staticDescription,
            darkImage: args.dynamicDarkImage,
        } : null,
    };
}

export interface SlideList {
    slides: (
        (ImgData | DynamicImg)[]
        | (ImgData[])
        | (DynamicImg[])
    )
}

export interface Asset {
    title: string,
    description: string,
    seller: string,

    key: string,
    type: AssetType[],
    tags: string[],

    slides: SlideList,

    price: number,
    discount: number,
}

export interface Result {
    ok: boolean,
    value: any,
}

export interface UserAccount {
    userName : string,
    password : string, // TODO : substitute by hash
    email : string,
    isAdmin : boolean,
}