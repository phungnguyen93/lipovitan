import { Collapse, Select } from "antd";
import { Input, TextArea, InputSelect } from "@/diginext/form/Form";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize, ButtonType } from "@/dashkit/Buttons";
import { useRef } from "react";
const { Panel } = Collapse;
const { Option } = Select;

const SectionPost2 = (props) => {

    const formInputRef = useRef({});

    const updateSection = function(isDelete = false) {
        props.updateSection(props.locale, formInputRef.current.section.value.value, props.index, isDelete);
    };

    return (
        <Collapse defaultActiveKey={[`postContent_${props.locale}${props.indexRef}`]} >
            <Panel header="Section 2" key={`postContent_${props.locale}${props.indexRef}`}>
                <ListItem style={{ marginRight: "1rem" }}>
                    <InputSelect
                        ref={el => formInputRef.current.section = el}
                        labelInValue
                        defaultValue={{value: 2}}
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
                    defaultValue={2}
                    style={{display: 'none'}}
                />
                <HorizontalList itemSize={ListItemSize.AUTO}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][title]`] = el}
                            defaultValue={props.content.title}
                            placeholder="Lan toản xu hướng xây dựng xanh"
                        />
                    </ListItem>
                </HorizontalList>
                <HorizontalList itemSize={ListItemSize.AUTO}>
                    <ListItem>
                        <TextArea
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][description]`] = el}
                            defaultValue={props.content.description}
                            placeholder="Cập nhật những thông tin mới nhất về sự chuyển đổi của 
                                            thế giới và hành trình chúng tôi đưa vật liệu thân thiện với môi trường vào các công trình, 
                                            góp phần thúc đẩy sự phát triển bền vững cùng nên kinh tế tuần hoàn tại Việt Nam"
                            height="100px"
                        />
                    </ListItem>
                </HorizontalList>
            </Panel>
        </Collapse>
    );
};

export default SectionPost2;