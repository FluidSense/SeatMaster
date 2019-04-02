from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib


def sendMail(subjectText, recipientsList, contentText):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subjectText
    msg['From'] = "idi-masterplass@stud.ntnu.no"
    msg.attach(MIMEText(contentText, 'plain', 'utf-8'))
    s = smtplib.SMTP(host='smtp.stud.ntnu.no', port=25)
    for recipient in recipientsList:
        s.sendmail("idi-masterplass@stud.ntnu.no", recipient, msg.as_string())
    s.quit()
