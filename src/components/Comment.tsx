import '../styles/comment.scss';
import profileImage from "../assets/photos/me.png";
import {ReactComponent as MySvg} from "../assets/photos/me3.svg";
import {ReactComponent as ApprovalSvg} from "../assets/approval.svg";
import {ReactComponent as LikeSvg} from "../assets/heart-regular.svg";
import {ReactComponent as ShareSvg} from "../assets/share.svg";
import React, {useEffect} from "react";
import {CopyButton} from "./CopyButton";
import {App} from "../App";

export interface CommentProps {
    profileImage?: string,
    name?: string,
    username?: string,

    content?: string,
}

export const Comment = (props: CommentProps) => {

    useEffect(() => {
        document.querySelectorAll('.like-svg').forEach(svg => {
            svg.addEventListener('click', () => {
                svg.classList.toggle('toggled');
            })
        })
    }, []);

    return (<div className={`comment-body`}>
        <div className={'comment-body__profile-body'}>
            <div className={'image-wrapper'}>
                <MySvg className={'my-svg'}/>
                {/*<img src={props.profileImage}/>*/}
            </div>
            <div className={'profile-info'}>
                <div className={'profile-info__name-box'}>
                    <p className={'profile-info__name'}>{props.name}</p>
                    <ApprovalSvg/>
                </div>
                <div className={'profile-info__username-box'}>
                    <p className={'profile-info__username'}>{props.username}</p>
                    <CopyButton text={'@Che4ve'}/>
                </div>
            </div>
        </div>
        <div className={'comment-body__content'}>
            <pre>
                {props.content}
            </pre>
        </div>
        <div className={'comment-body__actions'}>
            <LikeSvg className={'like-svg'}/>
            <ShareSvg className={'share-svg'}/>
        </div>
    </div>)
}