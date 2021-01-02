import { notification } from "antd";
import { message } from "antd";
import { isArray, isObject } from "util";
import qs from "querystring";

var self = module.exports = {
    showSuccess: function(res) {
        if(res.status == true && Array.isArray(res.message)) {
            res.message.map(msg => {
               notification.success({
                    message: msg
               });
            });
        } else if(res.status == true && res.message) {
            notification.success({
                message: res.message
            });
        } else {
            notification.success({
                message: 'Success'
            });
        }
    },

    showError: function(res) {
        if(res.status == false && Array.isArray(res.message)) {
            res.message.map(msg => {
               notification.error({
                    message: msg
               });
            });
        } else if(res.status == false && res.message) {
            notification.error({
                message: res.message
            });
        } else {
            notification.error({
                message: 'Something wrong!'
            });
        }
    },

    showMessages: function(msgs, isError = true) {
        if(isError) {
            msgs.forEach(function(msg) {
                message.error(msg);
            });
        } else {
            msgs.forEach(function(msg) {
                message.success(msg);
            });
        }
    },

    showNotifications: function(messages, isError = true) {
        if(isError) {
            messages.forEach(function(message) {
                notification.error({
                    message
                });
            });
        } else {
            messages.forEach(function(message) {
                notification.success({
                    message
                });
            });
        }
    },

    getBase64: function(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    },

    getFileNameFromPath: function(path) {
        if(path == null) {
            return path;
        }
        let ext = path.substring(path.lastIndexOf('.'));
        let originalName = path.substring(path.lastIndexOf('/')+1, path.lastIndexOf(ext));
        originalName = originalName.substring(0, path.lastIndexOf('_'));
        return `${originalName}${ext}`;
    },

    isFile: function(object) {
        if(typeof object.type != 'undefined' && typeof object.size != 'undefined') {
            return true;
        } else {
            return false;
        }
    },

    isFileByStr: function(fileName) {
        fileName = `${fileName}`;
        return fileName.match(/\.(jpg|jpeg|png|gif|txt|doc|docx|xls|xlsx|ppt|pptx|csv)$/)
    },

    checkPermission: function(user, permission) {
        if(!user) {
            return false;
        }
        let userPermission = user.userPermission;
        let isAdmin = userPermission.isAdmin;
        let hasPermission = (userPermission.permissions[permission] || 0) == 1;
        if(!isAdmin && !hasPermission) {
            return false;
        } else {
            return true;
        }
    },

    strToSlug: function(str) {
        let slug = self.removeSignVietnamese(str);
        slug = slug.replace(/^\s+|\s+$/g, "");
        slug = slug.replace(/\ +/g, "-");
        slug = slug.toLowerCase();
        return slug;
    },

    removeSignVietnamese(str = '') {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    },

    forEachAny: function(data, cb) {
        if(isArray(data) && data) {
            data.forEach(function(ele, index) {
                cb(ele, index);
            });
        } else if(isObject(data) && data) {
            Object.keys(data).forEach(function(index) {
                cb(data[index], index);
            });
        }
    },

    trackingFormUrl: function(form, content, previousKey) {
        self.forEachAny(content, function(ele, index) {
            let key = index;
            if(previousKey) {
                key = `${previousKey}[${key}]`;
            }
            if(!ele || self.isFile(ele)) {
                form[key] = ele;
            } else if(isArray(ele) && ele.length == 0) {
                form[`${key}[]`] = '';
            } else if(isObject(ele) && Object.keys(ele).length == 0) {
                form[`${key}`] = {};
            } else if(isArray(ele) || isObject(ele)) {
                self.trackingFormUrl(form, ele, key);
            } else {
                form[key] = ele;
            }
        });
    },
    
    trackingFormData: function(form, content, previousKey) {
        self.forEachAny(content, function(ele, index) {
            let key = index;
            if(previousKey) {
                key = `${previousKey}[${key}]`;
            }

            if(!ele || self.isFile(ele)) {
                form.append(key, ele);
            } else if(isArray(ele) && ele.length == 0) {
                form.append(`${key}[]`, '');
            } else if(isArray(ele) || isObject(ele)) {
                self.trackingFormData(form, ele, key);
            } else  {
                form.append(key, ele);
            }
        });
    },

    trackingContentRef: function(contentRef, previousKey, sort = [], contentImgs = [], contentRmImgs = [], field = 'content') {
        let content = [];
        let sortedContent = [];
        self.forEachAny(contentRef, function(current, index) {
            let key = index;
            if(previousKey) {
                key = `${previousKey}[${key}]`;
            }
            // check is ref content
            let isContentValue = (key.substr(0, field.length) == field) ? true : false;
            if(isContentValue && current) {
                let imgFields = ['image', 'banner'];
                let value = current.value ? current.value : '';
                if(value.value) {
                    value = value.value;
                }
                if(current.editor) {
                    value = current.editor.getData();
                }

                // get rest key of content as [0][section] | [0][title]
                let restKey = key.substr(field.length);
                let sectionPosition = restKey.substr(1, restKey.indexOf(']') - 1); // only number
                //
                let topNamePosition = restKey.substr(restKey.indexOf(']') + 2);
                topNamePosition = topNamePosition.substr(0, topNamePosition.indexOf(']'));
                //
                let secondPosition = restKey.substr(restKey.indexOf(topNamePosition) + topNamePosition.length + 2);
                secondPosition = secondPosition.substr(0, secondPosition.indexOf(']'));

                let secondNamePosition = restKey.substr(restKey.lastIndexOf('[') + 1);
                secondNamePosition = secondNamePosition.substr(0, secondNamePosition.indexOf(']'));

                if(!content[sectionPosition]) {
                    content[sectionPosition] = {};
                }

                if(!contentImgs[value] && contentRmImgs.includes(value) 
                    && (topNamePosition.includes('image') || topNamePosition.includes('banner'))) {
                    value = '';
                } else if(!contentImgs[value] && !self.isFileByStr(value) 
                && (topNamePosition.includes('image') || topNamePosition.includes('banner'))) {
                    value = '';
                }

                if(secondPosition && !isNaN(secondPosition) && secondNamePosition && typeof secondNamePosition == 'string') {
                    content[sectionPosition][topNamePosition] = content[sectionPosition][topNamePosition] || [];
                    content[sectionPosition][topNamePosition][secondPosition] = content[sectionPosition][topNamePosition][secondPosition] || {};
                    content[sectionPosition][topNamePosition][secondPosition][secondNamePosition] = value;
                } else if(secondPosition && !isNaN(secondPosition)) {
                    content[sectionPosition][topNamePosition] = content[sectionPosition][topNamePosition] || [];
                    content[sectionPosition][topNamePosition][secondPosition] = value;
                } else {
                    content[sectionPosition][topNamePosition] = value;
                }
            }
        });

        sort.forEach(function(order) {
            if(content[order]) {
                sortedContent.push(content[order]);
            }
        });

        return sortedContent;
    },
}