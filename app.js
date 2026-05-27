/* ==================== DỮ LIỆU DỰ ÁN ==================== */
// Dữ liệu chi tiết của các dự án để hiển thị trong Modal
const projectsData = {
    'Hệ Thống Quản Lý Hồ Sơ Bệnh Nhân': {
        description: 'Ứng dụng quản lý thông tin bệnh nhân toàn diện, cho phép lưu trữ, tìm kiếm và cập nhật hồ sơ bệnh nhân. Hệ thống được xây dựng sử dụng kiến trúc MVC truyền thống chạy trên máy chủ Tomcat.',
        technologies: ['Java', 'Spring Boot', 'Tomcat', 'MySQL', 'Servlet/JSP', 'JUnit'],
        structure: `
            - Model: Các entity như Patient, MedicalRecord
            - View: JSP pages để hiển thị giao diện
            - Controller: Spring Controllers để xử lý yêu cầu HTTP
            - Service Layer: BusinessLogic để xử lý logic nghiệp vụ
            - Database: MySQL để lưu trữ dữ liệu bệnh nhân
        `,
        features: [
            'Tạo, đọc, cập nhật và xóa (CRUD) hồ sơ bệnh nhân',
            'Tìm kiếm bệnh nhân theo tên, ID bệnh nhân',
            'Ghi lại lịch sử khám bệnh và đơn thuốc',
            'In báo cáo hồ sơ bệnh nhân',
            'Xác thực người dùng và phân quyền'
        ]
    },
    'Web API Quản Lý Thiết Bị IoT': {
        description: 'API REST được xây dựng bằng .NET Core để quản lý các thiết bị IoT thông minh. API cung cấp các endpoint để tạo, cập nhật, kiểm soát và giám sát các thiết bị IoT từ xa.',
        technologies: ['C#', '.NET Core', 'ASP.NET Web API', 'Entity Framework', 'SQL Server', 'RESTful'],
        structure: `
            - Controllers: Xử lý HTTP requests (GET, POST, PUT, DELETE)
            - Services: Logic kinh doanh cho quản lý thiết bị
            - Models: Entities đại diện cho Device, Sensor, CommandLog
            - Data Access Layer: Entity Framework cho database operations
            - Database: SQL Server lưu trữ thông tin thiết bị
        `,
        features: [
            'Tạo và quản lý các thiết bị IoT',
            'Điều khiển thiết bị từ xa thông qua API',
            'Giám sát trạng thái thiết bị real-time',
            'Ghi lại lịch sử hoạt động của các thiết bị',
            'Xác thực bằng JWT tokens',
            'Logging và error handling toàn diện'
        ]
    },
    'Kịch Bản Kiểm Thử Tự Động Dữ Liệu Lớn': {
        description: 'Tự động hóa kiểm thử cho hệ thống xử lý dữ liệu quy mô lớn. Sử dụng Ranorex Studio để tạo các kịch bản kiểm thử tự động, giúp đảm bảo chất lượng và tính ổn định của ứng dụng.',
        technologies: ['Ranorex Studio', 'JUnit', 'TestNG', 'Selenium', 'Java', 'Git'],
        structure: `
            - Test Scripts: Các kịch bản kiểm thử được tạo bằng Ranorex Studio
            - Page Objects: Mô tả các phần tử UI cần kiểm thử
            - Test Data: Bộ dữ liệu lớn cho kiểm thử hiệu suất
            - Reports: Báo cáo chi tiết kết quả kiểm thử
            - CI/CD Integration: Tích hợp với Jenkins/GitHub Actions
        `,
        features: [
            'Tạo kịch bản kiểm thử tự động bằng ghi âm',
            'Kiểm thử chức năng trên các trình duyệt khác nhau',
            'Kiểm thử hiệu suất với dữ liệu lớn',
            'Tạo báo cáo HTML chi tiết',
            'Tích hợp kiểm thử vào pipeline CI/CD',
            'Thực hiện kiểm thử hồi quy tự động'
        ]
    },
    'Thiết Bị Hỗ Trợ Thông Minh': {
        description: 'Thiết bị hỗ trợ thông minh tích hợp ESP32 vi điều khiển và cảm biến MPU6050 để cảm nhận chuyển động. Kết nối với Blynk IoT platform để giám sát và điều khiển từ xa thông qua ứng dụng di động.',
        technologies: ['ESP32', 'Arduino IDE', 'C++', 'Blynk IoT', 'MPU6050', 'MQTT'],
        structure: `
            - Firmware: Code C++ chạy trên ESP32
            - Sensor Interface: Thư viện MPU6050 để đọc dữ liệu gia tốc
            - Blynk Integration: Kết nối và gửi dữ liệu tới Blynk cloud
            - Mobile App: Ứng dụng Blynk để giám sát thiết bị
            - Data Processing: Xử lý dữ liệu cảm biến và logic điều khiển
        `,
        features: [
            'Đọc dữ liệu gia tốc từ cảm biến MPU6050',
            'Gửi dữ liệu lên Blynk cloud real-time',
            'Điều khiển thiết bị thông qua ứng dụng Blynk',
            'Cảnh báo khi phát hiện chuyển động bất thường',
            'Lưu trữ lịch sử hoạt động trên cloud',
            'Tiêu thụ năng lượng tối ưu cho pin'
        ]
    }
};

/* ==================== HÀNG ĐỢI MODAL ==================== */
// Lấy các phần tử DOM liên quan đến modal
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTechnologies = document.getElementById('modalTechnologies');
const modalStructure = document.getElementById('modalStructure');
const modalFeatures = document.getElementById('modalFeatures');

/* ==================== XỬ LÝ MODAL ==================== */
/**
 * Mở modal và hiển thị chi tiết dự án
 * @param {string} projectTitle - Tên của dự án để lấy dữ liệu
 */
function openProjectModal(projectTitle) {
    const projectData = projectsData[projectTitle];
    
    if (!projectData) {
        console.error('Dự án không tìm thấy:', projectTitle);
        return;
    }

    // Cập nhật nội dung modal
    modalTitle.textContent = projectTitle;
    modalDescription.textContent = projectData.description;

    // Hiển thị các công nghệ sử dụng
    modalTechnologies.innerHTML = '';
    projectData.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tag';
        techTag.textContent = tech;
        modalTechnologies.appendChild(techTag);
    });

    // Hiển thị cấu trúc dự án
    modalStructure.textContent = projectData.structure;

    // Hiển thị danh sách tính năng
    modalFeatures.innerHTML = '';
    projectData.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
    });

    // Hiển thị modal với thêm class 'active'
    modal.classList.add('active');
}

/**
 * Đóng modal bằng cách xóa class 'active'
 */
function closeProjectModal() {
    modal.classList.remove('active');
}

/* ==================== EVENT LISTENERS MODAL ==================== */
// Đóng modal khi click vào nút X
modalClose.addEventListener('click', closeProjectModal);

// Đóng modal khi click ra ngoài modal (vùng overlay)
modal.addEventListener('click', (e) => {
    // Chỉ đóng nếu click trực tiếp trên background (modal overlay), không click vào modal-content
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Đóng modal khi nhấn phím Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeProjectModal();
    }
});

/* ==================== XỬ LÝ BỘ LỌC DỰ ÁN ==================== */
// Lấy tất cả các nút filter
const filterButtons = document.querySelectorAll('.filter-btn');
// Lấy tất cả các thẻ dự án
const projectCards = document.querySelectorAll('.project-card');

/**
 * Lọc các dự án dựa trên danh mục được chọn
 * @param {string} category - Danh mục để lọc (all, java, dotnet, automation, iot)
 */
function filterProjects(category) {
    projectCards.forEach(card => {
        // Nếu filter là 'all' hoặc danh mục của card match với filter được chọn
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden'); // Hiển thị card
        } else {
            card.classList.add('hidden'); // Ẩn card
        }
    });
}

// Thêm event listener cho mỗi nút filter
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Xóa class 'active' từ tất cả nút
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Thêm class 'active' vào nút được click
        e.target.classList.add('active');
        
        // Lấy giá trị category từ data-filter attribute
        const selectedCategory = e.target.getAttribute('data-filter');
        
        // Gọi hàm filter
        filterProjects(selectedCategory);
    });
});

/* ==================== CLICK VÀO PROJECT CARD ==================== */
/**
 * Thêm event listener cho mỗi project card
 * Khi click vào card, mở modal với chi tiết dự án
 */
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // Lấy tiêu đề dự án từ card
        const projectTitle = card.querySelector('.project-title').textContent;
        
        // Mở modal với chi tiết dự án
        openProjectModal(projectTitle);
    });
});

/* ==================== XỬ LÝ BIỂU MẪU LIÊN HỆ ==================== */
const contactForm = document.getElementById('contactForm');

/**
 * Xử lý sự kiện submit form
 * Kiểm tra dữ liệu và hiển thị thông báo thành công
 */
contactForm.addEventListener('submit', (e) => {
    // Ngăn chặn hành động mặc định của form (reload trang)
    e.preventDefault();

    // Lấy các giá trị từ form
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Kiểm tra xác thực dữ liệu cơ bản
    if (!fullName || !email || !subject || !message) {
        alert('⚠️ Vui lòng điền đầy đủ tất cả các trường!');
        return;
    }

    // Kiểm tra định dạng email đơn giản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('⚠️ Vui lòng nhập địa chỉ email hợp lệ!');
        return;
    }

    // Nếu tất cả validation pass, hiển thị thông báo thành công
    showSuccessMessage(fullName, subject);

    // Reset form để người dùng có thể gửi tin nhắn khác
    contactForm.reset();
});

/**
 * Hiển thị thông báo thành công khi submit form
 * @param {string} fullName - Tên người gửi
 * @param {string} subject - Tiêu đề tin nhắn
 */
function showSuccessMessage(fullName, subject) {
    // Tạo một phần tử div để chứa thông báo
    const successMessage = document.createElement('div');
    successMessage.className = 'success-notification';
    successMessage.innerHTML = `
        <div class="notification-content">
            <h3>✓ Tin nhắn đã gửi thành công!</h3>
            <p>Cảm ơn <strong>${fullName}</strong>, tôi sẽ liên hệ lại bạn sớm nhất có thể!</p>
        </div>
    `;

    // Thêm CSS cho thông báo (nếu chưa có)
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .success-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 1.5rem;
                border-radius: 0.75rem;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
                z-index: 2000;
                animation: slideInRight 0.5s ease-out;
                max-width: 400px;
            }

            .notification-content h3 {
                margin: 0 0 0.5rem 0;
                font-size: 1.1rem;
            }

            .notification-content p {
                margin: 0;
                font-size: 0.95rem;
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            /* Responsive cho mobile */
            @media (max-width: 768px) {
                .success-notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Thêm thông báo vào trang
    document.body.appendChild(successMessage);

    // Xóa thông báo sau 5 giây
    setTimeout(() => {
        successMessage.style.animation = 'slideInRight 0.5s ease-out reverse';
        setTimeout(() => successMessage.remove(), 500);
    }, 5000);
}

/* ==================== SMOOTH SCROLL ==================== */
/**
 * Xử lý smooth scroll khi click vào navigation links
 * Đây là feature bonus, HTML5 đã hỗ trợ scroll-behavior: smooth ở CSS
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Lấy ID của section target
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Nếu element tồn tại
        if (targetElement) {
            // Scroll tới element với smooth animation
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ==================== INITIALIZATION ==================== */
/**
 * Hàm khởi tạo - chạy khi DOM đã load xong
 */
document.addEventListener('DOMContentLoaded', () => {
    // Log thông báo khởi tạo thành công (cho debugging)
    console.log('✓ Portfolio loaded successfully!');
    console.log('Các tính năng có sẵn:');
    console.log('- Bộ lọc dự án theo danh mục');
    console.log('- Modal chi tiết dự án');
    console.log('- Biểu mẫu liên hệ với xác thực');
    console.log('- Smooth scroll');
});
