import '../styles/timeline.scss'
import {MouseEventHandler, ReactNode, useState} from "react";
import {useIntersectionObserver} from "usehooks-ts"
import {ReactComponent as DotsSvg} from "../assets/workDots.svg";
import {WorkData} from "../models/WorkData";
import {Modal} from "./Modal";


interface TimelineProps {
    workData: WorkData[],
    showMonths?: boolean,
    showYears?: boolean,
    WorkData?: boolean

    setSelectedIndex?: Function;
}

export const Timeline = (props: TimelineProps) => {

    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState <WorkData | undefined > (undefined);

    const handleIconMouseOver = (event: React.MouseEvent<HTMLDivElement>, data: WorkData, index: number) => {
        setHoveredIndex(index);
        if (props.setSelectedIndex) {
            props.setSelectedIndex(index);
        }
    };

    const handleIconMouseLeave = (event: React.MouseEvent<HTMLDivElement>, data: WorkData, index: number) => {

    };

    const handleMoreClick = (data: WorkData) => {
        setData(data);
        setModalVisible(true)
    }

    return (
        <>
        <div className="timeline">
            {props.workData.map((data: WorkData, index: number) => {
                return (
                    <div className={`work`} id={`work-${index}`} key={`work-${index}`}>
                        <div className={`workPath`} id={`workPath-${index}`} key={`workPath-${index}`}>
                            <div className={`workIcon ${index === hoveredIndex ? 'selected' : ''}`} id={`workIcon-${data.id.toString()}`} key={`workIcon-${index}`}
                                 onMouseOver={(e) => handleIconMouseOver(e, data, index)}>
                                {data.iconElement ?? <></>}
                            </div>
                            <div
                                className={`line ${index === props.workData.length ? 'last' : ''}`}
                                id={`line-${data.id.toString()}`}
                                key={`line-${index}`}
                            >
                                <DotsSvg className={`dotsSvg`} key={`dotsSvg-${index}`}/>
                            </div>
                        </div>
                        <div className={`workCard ${index === hoveredIndex ? 'visible' : ''}`}
                             key={`workCard-${index}`} onClick={(e) => {
                            handleMoreClick(data)
                        }}>
                            <p className={'workName'} key={`workName-${index}`}>{data.title ?? ""}</p>
                            <div className={'period'}>
                                <p className={'dateStart'}>{data.dateStart ?? ''}</p>
                                <p> — </p>
                                <p className={'dateFinish'}>{data.dateFinish ?? ''}</p>
                            </div>
                            <div className={'description'}>
                                <p>{data.shortInfo ?? ''}</p>
                            </div>
                            <div className={'more'} onClick={(e) => {
                                handleMoreClick(data)
                            }}>
                                <p>Подробнее</p>
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </div>
        {modalVisible && (
            <Modal visible={modalVisible} setVisible={setModalVisible} title={data?.title} id={'work-modal'}>
                        <pre className={'work__stack'}>
                            <p>Стек:</p>
                            <p className={'stack-content'}>{data?.stack ?? ""}</p>
                        </pre>
                <pre className={'work__description'}>{data?.description ?? ""}</pre>
                <pre className={'work__content'}>{data?.content ?? ""}</pre>
            </Modal>
        )}
        </>
    )
}