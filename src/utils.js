function timeDifference(current, previous) {
    const milliSecondsPerMinute = 60 * 1000
    const milliSecondsPerHour = milliSecondsPerMinute * 60
    const milliSecondsPerDay = milliSecondsPerHour * 24
    const milliSecondsPerMonth = milliSecondsPerDay * 30
    const milliSecondsPerYear = milliSecondsPerDay * 365

    const elapsed = current - previous

    if (elapsed < milliSecondsPerMinute / 3) {
        return 'just now'
    }

    if (elapsed < milliSecondsPerMinute) {
        return 'less than 1 min ago'
    } else if (elapsed < milliSecondsPerHour) {
        return Math.round(elapsed / milliSecondsPerMinute) + ' min ago'
    } else if (elapsed < milliSecondsPerDay) {
        return Math.round(elapsed / milliSecondsPerHour) + ' h ago'
    } else if (elapsed < milliSecondsPerMonth) {
        return Math.round(elapsed / milliSecondsPerDay) + ' days ago'
    } else if (elapsed < milliSecondsPerYear) {
        return Math.round(elapsed / milliSecondsPerMonth) + ' mo ago'
    } else {
        return Math.round(elapsed / milliSecondsPerYear) + ' years ago'
    }
}

export function timeDifferenceForDate(date) {
    const now = new Date().getTime()
    const updated = new Date(date).getTime()
    return timeDifference(now, updated)
}

// *********** Upload file to Cloudinary ******************** //
const cloudName = 'dlecejpdr';
const unsignedUploadPreset = 'Your upload preset';

export function uploadFileCloudinary(file) {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // File uploaded successfully
            const response = JSON.parse(xhr.responseText);

            // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
            const url = response.secure_url;

            // Create a thumbnail of the uploaded image, with 150px width
            const tokens = url.split('/');
            tokens.splice(-2, 0, 'w_150,c_scale');

            let img = new Image(); // HTML5 Constructor
            img.src = tokens.join('/');
            img.alt = response.public_id;
            document.getElementById('gallery').appendChild(img);
        }
    };

    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    xhr.send(fd);
}