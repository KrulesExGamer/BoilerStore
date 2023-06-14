import './AppSection.css'
import SectionSlider, { WindowData } from '../components/SectionSlider';
import SearchBar from '../components/SearchBar';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import bulletHell from '../img/bullet-hell.jpeg';
import bulletHellGif from '../img/enter-the-gungeon.gif';
import fps from '../img/fps.jpeg';
import zeldaLike from '../img/zelda-like.png';
import IconButton from '../components/IconButton';
import { Link } from 'react-router-dom';


let Data: WindowData[] = [
    {
        title: 'Firts Person Shoter',
        description: 'A fi',
        icon: undefined,
        key: 'fps',
        slides: [
            { staticImage: fps, dynamicImage: undefined, description: 'A porsche.', darkImage: false, },
        ],
        price: 1.87,
        discount: 0.05,
    },
    {
        title: 'Bullet Hell',
        description: 'A fi',
        icon: undefined,
        key: 'bullet-hell',
        slides: [
            { staticImage: bulletHell, dynamicImage: bulletHellGif, description: 'A porsche.', darkImage: true, },
        ],
        price: 12.87,
        discount: 0.05,
    },
    {
        title: 'Zelda Likeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        description: 'A fi',
        icon: undefined,
        key: 'zelda-like',
        slides: [
            { staticImage: zeldaLike, dynamicImage: undefined, description: 'A porsche.', darkImage: false, },
        ],
        price: 1.87,
        discount: 0.05,
    },
];

const AppSection = (props : {
    data : WindowData[] | null,

    emoji : string,

    title : string,
    
    itemQueryFormat: string,
    searchQueryFormat: string,

    titleWeight : string,
    emojiWeight : string,

    titleSize: string,
    emojiSize : string,

    morePage : string,
    moreIcon : any,
    moreText : string,

    searchBarColor : string,
    bgColors : [string, string],
    shadowColors : [string, string],

    windowWidth: string | null,
    windowHeight: string | null,

    displayPrice : boolean | null,
    displayType : boolean | null,
    hasSearchBar : boolean,
} ) => {
    const data = null == props.data ? Data : props.data;


    return (
        <section 
            className='AppSection'
            style={{
                background: `linear-gradient(45deg, ${props.bgColors[0]}, ${props.bgColors[1]})`,
            }}
        >
            {props.emoji && 
                <p style={{
                    fontWeight: props.emojiWeight,
                    fontSize: props.emojiSize,
                }} > 
                    {props.emoji} 
                </p>
            }

            <h2 style={{
                fontWeight: props.titleWeight,
                fontSize: props.titleSize,
            }} > 
                {props.title}
            </h2>

            {props.hasSearchBar && (
                <div className='searchbar-div'>
                    <SearchBar 
                        color={props.searchBarColor} 
                        queryFormat={props.searchQueryFormat} 
                    />
                </div>
            )}

            <div className='container'>
                <SectionSlider 
                    list={data} 
                    colors={props.shadowColors} 
                    itemQuery={props.itemQueryFormat} 
                    searchQuery={props.searchQueryFormat} 
                    displayPrice={props.displayPrice}
                />
            </div>
            <div className='more-parent'>
                <div className='more'>
                    <Link to={props.morePage}>
                        <IconButton icon={props.moreIcon} label={props.moreText} hideTextOnSmallScreen={false} />
                    </Link>
                </div>
            </div>

        </section>
    );
};

AppSection.defaultProps = {
    data: null,

    emoji: '',
    title: 'Sample Text',

    itemQueryFormat: 'results?search_query=__PLACEHOLDER__',
    searchQueryFormat: 'results?search_query=__PLACEHOLDER__',

    titleWeight: 'bold',
    emojiWeight: 'bold',
    titleSize: '1em',
    emojiSize: '1em',

    morePage: 'Not-Found',
    moreIcon: faEllipsis,
    moreText: 'Show me more! :p',

    searchBarColor: 'purple',
    shadowColors: ['green', 'yellow'],
    bgColors: ['cyan', 'purple'],

    windowWidth: null,
    windowHeight: null,

    displayPrice :null,
    displayType : null,
    hasSearchBar: false,
};


export default AppSection;