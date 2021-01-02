import { Collapse, Select } from "antd";
import { Input, TextArea, InputSelect } from "@/diginext/form/Form";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize, ButtonType } from "@/dashkit/Buttons";
import { getFileNameFromPath } from "@/helpers/helpers";
import ContentImage from '@/diginext/upload/contentImage'
import { useRef } from "react";
const { Panel } = Collapse;
const { Option } = Select;

const SectionCertificate3 = (props) => {

    const formInputRef = useRef({});

    const updateSection = function(isDelete = false) {
        props.updateSection(props.locale, formInputRef.current.section.value.value, props.index, isDelete);
    };

    return (
        <Collapse defaultActiveKey={[`postContent_${props.locale}${props.indexRef}`]} >
            <Panel header="Section 3" key={`postContent_${props.locale}${props.indexRef}`}>
                <ListItem style={{ marginRight: "1rem" }}>
                    <InputSelect
                        ref={el => formInputRef.current.section = el}
                        labelInValue
                        defaultValue={{value: 3}}
                    >
                        {props.sectionOptions.map(function(name, index) {
                            return(
                                <Select.Option key={`SectionBox_${props.locale}${index}`} value={index + 1}>{name}</Select.Option>
                            )
                        })}                            
                    </InputSelect>
                </ListItem>
                <AdminButton
                    size={ButtonSize.SMALL}
                    style={{margin: '5px'}}
                    onClick={e => updateSection(false)}
                >
                    Insert
                </AdminButton>
                <AdminButton
                    size={ButtonSize.SMALL}
                    style={{margin: '5px'}}
                    type={ButtonType.DANGER}
                    onClick={e => updateSection(true)}
                >
                    Remove
                </AdminButton>
                <Input
                    ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][section]`] = el}
                    defaultValue={3}
                    style={{display: 'none'}}
                />
                <HorizontalList itemSize={ListItemSize.AUTO}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][title]`] = el}
                            defaultValue={props.content.title}
                            placeholder="Kiểm định chất lượng sản phẩm"
                        />
                    </ListItem>
                </HorizontalList>
                <HorizontalList itemSize={ListItemSize.AUTO}>
                    <ListItem>
                        <TextArea
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][description]`] = el}
                            defaultValue={props.content.description}
                            placeholder="Chúng tôi tự hào cung cấp sản phẩm Panel PIR không chỉ mang lại hiệu quả xây dựng vượt trội 
                                            và hiệu suất lâu dài mà còn được cam kết chất lượng thông qua thử nghiệm khả năng chống 
                                            cháy đạt chuẩn Quốc tế."
                            height="100px"
                        />
                    </ListItem>
                </HorizontalList>
                <HorizontalList itemSize={ListItemSize.AUTO}>
                    <ListItem style={{ marginRight: "1rem" }}>
                    <ContentImage
                        name={ getFileNameFromPath(props.content.banner) || `banner_${props.locale}${props.indexRef}`}
                        imageUrl={props.contentImgs[`${props.content.banner ? getFileNameFromPath(props.content.banner) : `banner_${props.locale}${props.indexRef}`}Url`] || props.content.banner}
                        imageIsRemoved={props.contentRmImgs[`${getFileNameFromPath(props.content.banner)}`]}
                        handleChange={props.handleChangeSingleUploadContent}
                    />
                    <Input
                        ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][banner]`] = el}
                        defaultValue={ getFileNameFromPath(props.content.banner) || `banner_${props.locale}${props.indexRef}`}
                        style={{display: 'none'}}
                    />
                    </ListItem>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <InputSelect
                                ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][videoType]`] = el}
                                labelInValue
                                defaultValue={{value: props.content.videoType || '1'}}
                            >
                                {['Youtube', 'Vimeo'].map(function(name, index) {
                                    return(
                                        <Select.Option key={`VideoTypeBox_${props.locale}${index}`} value={`${index + 1}`}>{name}</Select.Option>
                                    )
                                })}                            
                            </InputSelect>
                            <Input
                                ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][youtubeLink]`] = el}
                                defaultValue={props.content.youtubeLink}
                                placeholder="https://www.youtube.com/watch?v=3HUOMO6c72g"
                            />
                        </ListItem>
                </HorizontalList>
            </Panel>
        </Collapse>
    );
};

export default SectionCertificate3;