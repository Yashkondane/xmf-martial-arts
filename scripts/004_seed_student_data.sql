-- Insert unique student records (duplicates removed based on email)
-- Note: You'll need to create auth users first before running this

-- This script assumes auth users are already created
-- Run this AFTER creating auth accounts for students

INSERT INTO public.students (id, email, student_name, date_of_birth, gender, contact_number, club_location, blood_group, weight, address, current_belt, guardian_name, emergency_contact)
SELECT 
  auth.users.id,
  students_data.email,
  students_data.student_name,
  students_data.date_of_birth,
  students_data.gender,
  students_data.contact_number,
  students_data.club_location,
  students_data.blood_group,
  students_data.weight,
  students_data.address,
  students_data.current_belt,
  students_data.guardian_name,
  students_data.emergency_contact
FROM (VALUES
  ('zhsanimates@gmail.com', 'Syed zubair Bilal Zameer', '21/10/2011', 'Male', '8892867179', 'Avalahalli', 'B positive', '57', 'JP Nagar 9th phase avalahalli', 'YELLOW BELT', 'Syed Zameer', '9880483966'),
  ('shireentaj912@gmail.com', 'Mohammed ayan', '17/10/2012', 'Male', '8861240506', 'Avalahalli', 'Non', '28', 'Avalahali Anjanapura jp nagar', 'WHITE', 'Mohammed ali', '8431445681'),
  ('tripathitanu539@gmail.com', 'Tanu Tripathi', '12/10/2001', 'Female', '9555367478', 'Jayanagar (Taverekere Park)', 'B+', '67.5', '1st Cross, Chikkulakshmma', 'WHITE', 'Sandeep Tripathi', '8806323035'),
  ('asraadoni@gmail.com', 'Syeda Noor Afshaan', '22/09/2012', 'Female', '9449828869', 'Frazer Town (Free Kick)', 'B+ve', '41', 'Frazer town', 'BLUE BELT', 'Syed Hamdullah Hussain', '8746065792'),
  ('ikramxmf@gmail.com', 'Mohamed Ikram Ulla', '11/08/2002', 'Male', '8197049058', 'Jayanagar (Taverekere Park)', 'A+', '75', '156 ground floor 6th main', 'BLACK BELT', 'Mohamed Samiulla S K', '7760594905'),
  ('bijut8879@gmail.com', 'CHRISHA MARY BIJU', '12/01/2012', 'Female', '9844241575', 'Jayanagar (Taverekere Park)', 'B+', '49kg', '#31, Maria Nivas, 1st main', 'RED STRIPE', 'BIJU THOMAS.K', '9844241575'),
  ('maryamtousif6@gmail.com', 'Sayeda maryam tousif', '06/11/2011', 'Female', '8618276700', 'Basavangudi (IWAN)', 'B+', '43', '36/1 1st floor sri ram mansion', 'RED STRIPE', 'Syed tousif masood', '7019595979'),
  ('Mohsinaaslam023@gmail.com', 'Yusra Aslam', '28/09/2010', 'Female', '7204863773', 'Jayanagar (Taverekere Park)', 'O+pv', '67', 'No.85,7th cross,Bismillah nagar', 'WHITE', 'Mohsina Aslam', '7337809037'),
  ('mannanabdul993311@gmail.com', 'Abdul Mannan', '20/03/2009', 'Male', '6360194347', 'Frazer Town (Free Kick)', 'A+', '55', 'Sfr manzil beside yaseen masjid', 'RED BELT', 'Fayaz ahmed', '9741632822'),
  ('lintamariyaj@gmail.com', 'Elano Emil Jose', '05/01/2018', 'Male', '8452900334', 'Electronic City', 'A+ve', '19kg', 'Flat G02 Sri Balaji classic', 'GREEN BELT', 'Emil Jose', '8547665269'),
  ('aswathyksinfy@gmail.com', 'Ryan Biju', '14/08/2018', 'Male', '9110826952', 'Electronic City', 'AB+', '18', 'Flat 405, Building 277 Sri Venkata', 'YELLOW STRIPE', 'Biju K', '8938807368'),
  ('khajaaahil95@gmail.com', 'Khaja aahil', '08/12/2011', 'Male', '8867656823', 'Frazer Town (Free Kick)', 'A+', '46', '26/1 B type, robertson road', 'WHITE', 'Khaja ziauddin', '9945600354'),
  ('rajsunar574@gmail.com', 'Raj sunar', '07/01/2012', 'Male', '8123859357', 'Basavangudi (IWAN)', 'B+', '40', 'Near South end circle metro', 'YELLOW BELT', 'Lalit sunar', '9731566948'),
  ('maryamkaunain2@gmail.com', 'Maryam kaunain', '23/08/1999', 'Female', '8050010679', 'Basavangudi (IWAN)', 'B+', '52', 'BHEL Layout, srk garden', 'YELLOW BELT', 'Syed amjad', '9686483213'),
  ('sameena.tashif@gmail.com', 'Manha Kaunain', '09/07/2013', 'Female', '7022163663', 'Basavangudi (IWAN)', 'O+', '32.9', '#54,BHEL Layout,SRK Garden', 'YELLOW BELT', 'Syed Amjad', '9980533837'),
  ('ruhihameed035@gmail.com', 'Hadiya sabahat', '28/09/2012', 'Female', '8073232384', 'Jayanagar (Taverekere Park)', 'A+', '48', '1/1 8th cross Bismillah nagar', 'WHITE', 'Hameed Ahmed', '9738462509'),
  ('suhail_21k@yahoo.com', 'SAFIYA KHAN', '26/07/2013', 'Female', '9972522235', 'Basavangudi (IWAN)', 'B+', '35 kg', '3rd cross SRK Garden, Tavarekere', 'WHITE', 'Mirza Saffiulla Khan', '9740400018'),
  ('keerthimd.93@gmail.com', 'AARAV NM', '06/08/2019', 'Male', '9745770072', 'Electronic City', 'O Positive', '17', 'JMR RESIDENCY, Flat no 505 E.city', 'YELLOW STRIPE', 'ANEESH NM', '8281648260'),
  ('syeda.heena3@gmail.com', 'Syeda Israh', '25/02/2014', 'Female', '9886701267', 'Basavangudi (IWAN)', 'A+', '29', '#16 Church Road,Basavangudi', 'WHITE', 'Syeda Ahmed', '9886441267'),
  ('zaibxmf@gmail.com', 'MOHAMED ZAIB TABREZ', '24/12/2008', 'Male', '9886812648', 'Frazer Town (Free Kick)', 'A+ positive', '52', '13#3 standage road Frazer town', 'BLACK STRIPE', 'MOHAMED', '9886812648'),
  ('Btsj60183@gmail.com', 'Kulsum Shasmeen', '22/05/2012', 'Female', '9164828668', 'Jayanagar (Taverekere Park)', 'O+', '48', 'Sardar ibrahim manzil near tavareker', 'WHITE', 'Fathima rida', '9164828668'),
  ('Fathima89rida@gmail.com', 'Fazal ul haadi', '06/03/2014', 'Male', '9164828668', 'Jayanagar (Taverekere Park)', 'O+', '30', 'Sardar ibrahim manzil near tavarekere', 'WHITE', 'Fathima Rida', '9164828668'),
  ('siddiquaayesha835@gmail.co', 'Mohammed Rayan', '13/07/2013', 'Male', '7019233877', 'Frazer Town (Free Kick)', 'B postive', '43', 'Frazer town', 'WHITE', 'Mohammed kouserulla', '7919233877'),
  ('Nidawahid604@gmail.com', 'Nida', '17/09/2008', 'Female', '8105283374', 'Jayanagar (Taverekere Park)', 'B+', '49', '9th block jayanagar, 26th main', 'YELLOW BELT', 'Abdul wahid', '9880942564'),
  ('naveedakhanum798@gmail.com', 'C.Abdul Nihal saqlain', '17/08/2012', 'Male', '9739564411', 'Jayanagar (Taverekere Park)', 'B+', '65', 'Yusra residency green orchid phase', 'WHITE', 'Chan basha', '9353716632'),
  ('najmanajma52757@gmail.com', 'K.Ayaan pasha', '23/03/2016', 'Male', '8884967176', 'Jayanagar (Taverekere Park)', 'O positive', '34', '8th main 8th cross New Gurappana', 'WHITE', 'Najma kalim pasha', '9880527176'),
  ('shaiksalman1245@gmail.com', 'Mohammad umair', '05/02/2016', 'Male', '9945036866', 'Avalahalli', 'O+', '25', 'Avalahali anjanapura post', 'YELLOW BELT', 'Shaik Salman', '9945036866'),
  ('mahboobp240@gmail.com', 'Mohammed arham', '05/11/2008', 'Male', '9740609734', 'Frazer Town (Free Kick)', 'B+', '56 kgs', 'Cox Town, Bachamaal road', 'WHITE', 'Mahboob pasha', '7760983337'),
  ('sajidakousar01011980@gmail.com', 'HUSNAIN', '13/10/2010', 'Male', '9342021281', 'Avalahalli', 'A+', '60', 'Flat no 302, Lakshmi prakash', 'YELLOW BELT', 'SAJIDA KAUSAR', '9342021281'),
  ('jophyjames@gmail.com', 'Daniel Abraham', '12/11/2013', 'Male', '9916129603', 'Electronic City', 'B+ve', '54', 'JMR RESIDENCY Electronic city', 'RED STRIPE', 'Ashan basil', '9916129603'),
  ('Hey.itsaura3007@gmail.com', 'Swathi Kathirvel', '25/11/2009', 'Female', '6366325339', 'Jayanagar (Taverekere Park)', 'B positive', '39 kg', 'Flat#104, Sri Benaka Homes', 'WHITE', 'Sangeetha J', '8105808808'),
  ('Sammuadil01@gmail.com', 'Manha sultana', '09/05/2010', 'Female', '9964018001', 'Frazer Town (Free Kick)', 'O+', '40kg', '#49,Kenchappa road, Frazer town', 'GREEN BELT', 'Adil pasha', '9945911113'),
  ('interactkhan@gmail.com', 'Mohammed Imran khan', '01/04/2015', 'Male', '8892680422', 'Basavangudi (IWAN)', 'A positive', '36', '9 3rd floor church road Basavangudi', 'YELLOW STRIPE', 'Mohammed Abubakar Siddique', '8553282666'),
  ('qwurukskdbfh@gmail.com', 'Syeda rabiya', '31/01/2004', 'Female', '9980191771', 'Jayanagar (Taverekere Park)', 'B', '56', 'Bismillah nagar taverekere park', 'YELLOW BELT', 'Ayesha banu', '7975290591'),
  ('juveriyasana123@gmail.com', 'Juveriya Sana', '23/05/2001', 'Female', '9902055013', 'Jayanagar (Taverekere Park)', 'O+ve', '51kgs', '1st cross, 1st main road, Bismillah', 'WHITE', 'Ayesha Siddiqua', '9900670357'),
  ('yasmeen22120407@gmail.com', 'Mohammad Arsh Mahir', '04/04/2014', 'Male', '8197590434', 'Jayanagar (Taverekere Park)', 'A+', '25', '#85 .7th cross near tavarkere park', 'WHITE', 'Mohammad zabiulla c', '9901588267'),
  ('Asifulla32221@gmail.com', 'Asfiya Fathima', '07/11/2016', 'Female', '9008549429', 'Frazer Town (Free Kick)', 'O P', '27', '#26 Mir Ubedulla Road Shivaji nagar', 'YELLOW STRIPE', 'Asif Ulla', '9738932169'),
  ('buharim@gmail.com', 'FATHIMAT ZAHRA S B', '21/12/2011', 'Female', '9995656550', 'Frazer Town (Free Kick)', 'O+ve', '52', 'NO 43/30 SAI DARSHAN BEHIND KFC', 'WHITE', 'BUHARI M', '9995669030'),
  ('Raiqfiro@gmail.com', 'M.y.Tooba', '06/04/2018', 'Female', '7019955643', 'Basavangudi (IWAN)', 'B positive', '22', 'Feteh residency Flat no 302', 'YELLOW BELT', 'M.mohammed yaseen', '7019955643'),
  ('farhaafzk@gmail.com', 'Umme Ayesha', '16/11/1986', 'Female', '7349372755', 'Frazer Town (Free Kick)', 'O+VE', '67', '#1198 sonappa garden near masjid', 'GREEN BELT', 'Akbar Ali', '9535551848'),
  ('shalinimj553@gmail.com', 'Shalini M', '15/04/2008', 'Female', '9886136539', 'Jayanagar (Taverekere Park)', 'O+', '48KG', '#76, 4th Cross, 2nd main road', 'YELLOW BELT', 'Jagadeesh MT', '8277688069'),
  ('malinimj24@gmail.com', 'Malini MJ', '24/08/2006', 'Female', '9880183027', 'Jayanagar (Taverekere Park)', 'O+', '48KG', '76, 4th cross, 2nd main road', 'YELLOW STRIPE', 'Jagadeesh MT', '8277688069'),
  ('jananimj5@gmail.com', 'Janani MJ', '05/05/2005', 'Female', '8277688069', 'Jayanagar (Taverekere Park)', 'O+', '49KG', '76, 2nd main, 4th cross road', 'BLACK BELT', 'Jagadeesh MT', '9880183027'),
  ('Nashraxmf01@gmail.com', 'Nashra Fathima', '29/08/2009', 'Female', '8088287729', 'Frazer Town (Free Kick)', 'A+ve', '65kgs', '41/6 2nd floor Netaji road', 'BLACK BELT', 'Nadeem Ahmed', '9986121808')
) AS students_data(email, student_name, date_of_birth, gender, contact_number, club_location, blood_group, weight, address, current_belt, guardian_name, emergency_contact)
JOIN auth.users ON auth.users.email = students_data.email
ON CONFLICT (email) DO NOTHING;
