console.log('Script.js injected!');

//Dictionary of prerequisites
var prereqs = {
  'CSCI': {
'4113': 'Requisites: Requires prerequisite course of CSCI 2400 (minimum grade C-). ',
'4229': 'Requisites: Requires prerequisite course of CSCI 2270 (minimum grade C-). ',
'4239': 'Requisites: Requires prerequisite course of CSCI 4229 (minimum grade C-). ',
'4900': 'Undergraduate Level Independent Study" ',
'1000': 'Requisites: Restricted to students with 0-26 credits (Freshmen) Computer Science (CSEN-BS ',
'6402': 'Requisites: Restricted to graduate students only. ',
'4250': 'Requisites: Restricted to students with 57-180 credits (Juniors or Seniors). ',
'4253': 'Systems and Techniques" ',
'4950': 'Requisites: Requires a prerequisite or corequisite course of CSCI 3100 (minimum grade C-). Restricted to students with 87-180 credits (Senior ',
'4960': 'Requisites: Restricted to students with 87-180 credits (Senior ',
'1220': 'None ',
'1240': 'None ',
'6454': 'Requisites: Requires prerequisite course of CSCI 5454 (minimum grade B). Restricted to graduate students only. ',
'6622': 'Requisites: Restricted to graduate students only. ',
'4273': 'Requisites: Requires prerequisite course of CSCI 3753 (minimum grade C-). ',
'4302': 'Requisites: Requires prerequisite course of CSCI 3302 (minimum grade C-). ',
'5573': 'Requisites: Requires prerequisite course of CSCI 2400 (minimum grade C). Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5135': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5229': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'1300': 'Requisites: Requires a prerequisite or corequisite course of MATH 1300 or MATH 1310 or APPM 1345 or APPM 1350 (all minimum grade C-). ',
'1310': 'Requisites: Requires a prerequisite or corequisite course of MATH 1300 or MATH 1310 or APPM 1345 or APPM 1350 (all minimum grade C-). ',
'6676': 'Requisites: Requires prerequisite course of CSCI 5606 (minimum grade B). Restricted to graduate students only. ',
'6686': 'Requisites: Requires prerequisite course of CSCI 5606 (minimum grade B). Restricted to graduate students only. ',
'4308': 'Requisites: Requires prerequisite courses of CSCI 3155 and CSCI 3308 (all minimum grade C-). Restricted to students with 87-180 credits (Senior ',
'4314': 'Requisites: Requires a prerequisite course of CSCI 3104 (minimum grade C-). ',
'5576': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'4448': 'Requisites: Requires prerequisite courses of CSCI 3155 and CSCI 3308 (all minimum grade C-). ',
'5593': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5239': 'Requisites: Requires prerequisite course of CSCI 5229 (minimum grade B). Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5250': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'1320': 'Requisites: Requires a prerequisite or corequisite course of MATH 1300 or MATH 1310 or APPM 1345 or APPM 1350 (all minimum grade C-). Restricted to College of Engineering or Computer Science (CSEN) or Pre-Engineering Arts and Science (PREN) majors only. ',
'2270': 'Requisites: Requires prerequisite courses of CSCI 1300 or CSCI 1310 or CSCI 1320 or ECEN 1030 or ECEN 1310 and APPM 1345 or APPM 1350 or MATH 1300 or MATH 1310 (all minimum grade C-). ',
'6800': 'Requisites: Restricted to graduate student Computer Sciences (CSEN) students only. ',
'6810': 'None ',
'4318': 'Requisites: Requires prerequisite course of CSCI 4308 (minimum grade C-). ',
'4328': 'Requisites: Requires prerequisite courses of CSCI 3155 and CSCI 3308 (all minimum grade C-). Restricted to students with 87-180 credits (Senior ',
'5606': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5608': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5253': 'Systems and Techniques ',
'5254': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'2400': 'Requisites: Requires prerequisite course of CSCI 2270 and a prereq or coreq course of CSCI 2824 or MATH 2001 or ECEN 2703 or APPM 3170 (minimum grade C-). ',
'2820': 'Requisites: Requires prerequisite courses of CSCI 2270 and APPM 1360 or MATH 2300 (all minimum grade C-). ',
'6940': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'6950': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'4338': 'Requisites: Requires prerequisite courses of CSCI 3155 and CSCI 3308 (all minimum grade C-). Restricted to students with 87-180 credits (Senior ',
'4348': 'Requisites: Requires prerequisite courses of CSCI 3155 and CSCI 3308 (all minimum grade C-). Restricted to students with 87-180 credits (Senior ',
'5622': 'Requisites: Requires prerequisite courses of CSCI 2400 and CSCI 3104 (all minimum grade C). Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5636': 'Requisites: Requires prerequisite course of CSCI 5606 (minimum grade B). Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only.only. ',
'5273': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5302': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'2824': 'Requisites: Requires prerequisite or corequisite course of CSCI 2270 and a prerequisite course of MATH 1300 or MATH 1310 or APPM 1350 or APPM 1345 (minimum grade C-). ',
'2830': 'None ',
'2900': 'Undergraduate Level Independent Study ',
'7000': 'Requisites: Restricted to graduate students only. ',
'7123': 'Requisites: Requires prerequisite course of CSCI 5573 (minimum grade B). Restricted to graduate students only. ',
'4413': 'Requisites: Requires prerequisite courses of CSCI 2400 and CSCI 4273 (all minimum grade C-). ',
'4446': 'Requisites: Requires prerequisite course of CSCI 1300 or CSCI 1310 or CSCI 1320 and APPM 2350 or MATH 2400 (all minimum grade C-). ',
'5646': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5654': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5314': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5340': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'3002': 'Requisites: Restricted to students with 27-180 credits (Sophomores ',
'3100': 'Requisites: Requires prerequisite course of CSCI 3308 (minimum grade C-). Restricted to Computer Science (CSEN-BS ',
'7135': 'Requisites: Restricted to graduate students only. ',
'7143': 'Requisites: Restricted to graduate students only. ',
'4502': 'Requisites: Requires prerequisite course of CSCI 2270 (minimum grade C-). ',
'5673': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5714': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5722': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5352': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5413': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'3104': 'Requisites: Requires prerequisite courses of CSCI 2270 and APPM 1360 or MATH 2300 and one of the following:  CSCI 2824 ',
'3112': 'None ',
'7154': 'Requisites: Requires prerequisite course of CSCI 5454 (minimum grade B). Restricted to graduate students only. ',
'7176': 'Requisites: Restricted to graduate students only. ',
'4555': 'Requisites: Requires prerequisite courses of CSCI 3155 and CSCI 2400 or ECEN 3350 (all minimum grade C-). ',
'4576': 'None ',
'5753': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5809': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'3287': 'Requisites: Requires prerequisite course of CSCI 3104 (minimum grade C-). ',
'5417': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5444': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'3155': 'Requisites: Requires prerequisite courses of CSCI 2270 and CSCI 2824 or ECEN 2703 or APPM 3170 or MATH 2001 (all minimum grade C-). ',
'3202': 'Requisites: Requires prerequisite courses of CSCI 2270 and CSCI 2824 or MATH 2001 or ECEN 2703 or APPM 3170 and one of the following:  APPM 3570 ',
'7222': 'Requisites: Restricted to graduate students only. ',
'7412': 'Requisites: Requires a prerequisite course of CSCI 6402 or EDUC 6504 or LING 6200 or PHIL 6310 or PSYC 6200 (minimum grade B). Restricted to graduate students only. ',
'4586': 'Requisites: Requires prerequisite course of CSCI 4576 (minimum grade C-). ',
'4593': 'Requisites: Requires prerequisite course of ECEN 3350 or CSCI 2400 (minimum grade C-).  Restricted to College of Engineering majors only. ',
'5817': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5822': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5446': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5448': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'7000': 'Requisites: Restricted to graduate students only. ',
'3302': 'Requisites: Requires prerequisite courses of CSCI 2270 and CSCI 2824 or ECEN 2703 or APPM 3170 or MATH 2001(all minimum grade C-). ',
'7422': 'Requisites: Requires a prerequisite course of LING 7415 or PSYC 7415 or CSCI 7412 or EDUC 6506 (minimum grade B). Restricted to graduate students only. ',
'7717': 'Requisites: Requires prerequisite course of CSCI 5817 (minimum grade B). Restricted to graduate students only. ',
'4753': 'Requisites: Requires prerequisite course of CSCI 3753 (minimum grade C-). ',
'4809': 'None ',
'5828': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5832': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5454': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5502': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'3308': 'Requisites: Requires prerequisite course of CSCI 2270 (minimum grade C-). ',
'3434': 'Requisites: Requires prerequisite courses of CSCI 3104 and CSCI 3155 (all minimum grade C-). ',
'7772': 'Requisites: Restricted to graduate students only. ',
'7818': 'Requisites: Restricted to graduate students only. ',
'4810': 'None ',
'4830': 'Requisites: Requires prerequisite course of CSCI 2400 (minimum grade C-). ',
'5839': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5900': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5525': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5535': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'3656': 'Requisites: Requires prerequisite courses of CSCI 1300 or CSCI 1310 or CSCI 1320 and APPM 1350 or MATH 1300 and APPM 1360 or MATH 2300 and MATH 3130 or APPM 3310 or CSCI 2820 (all minimum grade C-). ',
'3702': 'None ',
'7900': 'Requisites: Restricted to graduate students only. ',
'8990': 'Requisites: Restricted to graduate students only. ',
'5919': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5929': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5548': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5551': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'3753': 'Requisites: Requires prerequisite courses of CSCI 2270 and either CSCI 2400 or ECEN 3350 (all minimum grade C-). ',
'7123': 'Requisites: Requires prerequisite course of CSCI 5573 (minimum grade B). Restricted to graduate students only. ',
'6000': 'Requisites: Restricted to graduate students only. ',
'6268': 'Requisites: Requires prerequisite course of CSCI 5273 (minimum grade B). Restricted to graduate students only. ',
'6302': 'Requisites: Restricted to graduate students only. ',
'5573': 'Requisites: Requires prerequisite course of CSCI 2400 (minimum grade C). Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5576': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5593': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'4900': 'None Undergraduate Level Independent Study" ',
'5606': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5608': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'4950': 'Requisites: Requires a prerequisite or corequisite course of CSCI 3100 (minimum grade C-). Restricted to students with 87-180 credits (Senior ',
'4960': 'Requisites: Restricted to students with 87-180 credits (Senior ',
'1300': 'Requisites: Requires a prerequisite or corequisite course of MATH 1300 or MATH 1310 or APPM 1345 or APPM 1350 (all minimum grade C-). ',
'5622': 'Requisites: Requires prerequisite courses of CSCI 2400 and CSCI 3104 (all minimum grade C). Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5636': 'Requisites: Requires prerequisite course of CSCI 5606 (minimum grade B). Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only.only. ',
'6402': 'Requisites: Restricted to graduate students only. ',
'1000': 'Requisites: Restricted to students with 0-26 credits (Freshmen) Computer Science (CSEN-BS ',
'5135': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5229': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5646': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5654': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'6454': 'Requisites: Requires prerequisite course of CSCI 5454 (minimum grade B). Restricted to graduate students only. ',
'6622': 'Requisites: Restricted to graduate students only. ',
'6676': 'Requisites: Requires prerequisite course of CSCI 5606 (minimum grade B). Restricted to graduate students only. ',
'4113': 'Requisites: Requires prerequisite course of CSCI 2400 (minimum grade C-). ',
'1220': 'None ',
'1240': 'None ',
'5239': 'Requisites: Requires prerequisite course of CSCI 5229 (minimum grade B). Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5250': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5673': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5714': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'6686': 'Requisites: Requires prerequisite course of CSCI 5606 (minimum grade B). Restricted to graduate students only. ',
'6800': 'Requisites: Restricted to graduate student Computer Sciences (CSEN) students only. ',
'4229': 'Requisites: Requires prerequisite course of CSCI 2270 (minimum grade C-). ',
'4239': 'Requisites: Requires prerequisite course of CSCI 4229 (minimum grade C-). ',
'1310': 'Requisites: Requires a prerequisite or corequisite course of MATH 1300 or MATH 1310 or APPM 1345 or APPM 1350 (all minimum grade C-). ',
'1320': 'Requisites: Requires a prerequisite or corequisite course of MATH 1300 or MATH 1310 or APPM 1345 or APPM 1350 (all minimum grade C-). Restricted to College of Engineering or Computer Science (CSEN) or Pre-Engineering Arts and Science (PREN) majors only. ',
'5253': 'Systems and Techniques ',
'5817': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'6950': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5254': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5722': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5753': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'6810': 'None ',
'6940': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'4250': 'Requisites: Restricted to students with 57-180 credits (Juniors or Seniors). ',
'4253': 'Systems and Techniques" ',
'2270': 'Requisites: Requires prerequisite courses of CSCI 1300 or CSCI 1310 or CSCI 1320 or ECEN 1030 or ECEN 1310 and APPM 1345 or APPM 1350 or MATH 1300 or MATH 1310 (all minimum grade C-). ',
'2400': 'Requisites: Requires prerequisite course of CSCI 2270 and a prereq or coreq course of CSCI 2824 or MATH 2001 or ECEN 2703 or APPM 3170 (minimum grade C-). ',
'5273': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5302': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5314': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5809': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'4273': 'Requisites: Requires prerequisite course of CSCI 3753 (minimum grade C-). ',
'4302': 'Requisites: Requires prerequisite course of CSCI 3302 (minimum grade C-). ',
'2820': 'Requisites: Requires prerequisite courses of CSCI 2270 and APPM 1360 or MATH 2300 (all minimum grade C-). ',
'2824': 'Requisites: Requires prerequisite or corequisite course of CSCI 2270 and a prerequisite course of MATH 1300 or MATH 1310 or APPM 1350 or APPM 1345 (minimum grade C-). ',
'5340': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5352': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5822': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5828': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'7135': 'Requisites: Restricted to graduate students only. ',
'7143': 'Requisites: Restricted to graduate students only. ',
'4308': 'Requisites: Requires prerequisite courses of CSCI 3155 and CSCI 3308 (all minimum grade C-). Restricted to students with 87-180 credits (Senior ',
'4314': 'Requisites: Requires a prerequisite course of CSCI 3104 (minimum grade C-). ',
'2830': 'None ',
'2900': 'Undergraduate Level Independent Study" ',
'5413': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5417': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5832': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5839': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'7154': 'Requisites: Requires prerequisite course of CSCI 5454 (minimum grade B). Restricted to graduate students only. ',
'7176': 'Requisites: Restricted to graduate students only. ',
'4318': 'Requisites: Requires prerequisite course of CSCI 4308 (minimum grade C-). ',
'4328': 'Requisites: Requires prerequisite courses of CSCI 3155 and CSCI 3308 (all minimum grade C-). Restricted to students with 87-180 credits (Senior ',
'3002': 'Requisites: Restricted to students with 27-180 credits (Sophomores ',
'3100': 'Requisites: Requires prerequisite course of CSCI 3308 (minimum grade C-). Restricted to Computer Science (CSEN-BS ',
'5444': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5446': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5900': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5919': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'7222': 'Requisites: Restricted to graduate students only. ',
'7412': 'Requisites: Requires a prerequisite course of CSCI 6402 or EDUC 6504 or LING 6200 or PHIL 6310 or PSYC 6200 (minimum grade B). Restricted to graduate students only. ',
'4338': 'Requisites: Requires prerequisite courses of CSCI 3155 and CSCI 3308 (all minimum grade C-). Restricted to students with 87-180 credits (Senior ',
'4348': 'Requisites: Requires prerequisite courses of CSCI 3155 and CSCI 3308 (all minimum grade C-). Restricted to students with 87-180 credits (Senior ',
'3104': 'Requisites: Requires prerequisite courses of CSCI 2270 and APPM 1360 or MATH 2300 and one of the following:  CSCI 2824 ',
'3112': 'None ',
'5448': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5454': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5929': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'6000': 'Requisites: Restricted to graduate students only. ',
'7422': 'Requisites: Requires a prerequisite course of LING 7415 or PSYC 7415 or CSCI 7412 or EDUC 6506 (minimum grade B). Restricted to graduate students only. ',
'7717': 'Requisites: Requires prerequisite course of CSCI 5817 (minimum grade B). Restricted to graduate students only. ',
'4413': 'Requisites: Requires prerequisite courses of CSCI 2400 and CSCI 4273 (all minimum grade C-). ',
'4446': 'Requisites: Requires prerequisite course of CSCI 1300 or CSCI 1310 or CSCI 1320 and APPM 2350 or MATH 2400 (all minimum grade C-). ',
'3155': 'Requisites: Requires prerequisite courses of CSCI 2270 and CSCI 2824 or ECEN 2703 or APPM 3170 or MATH 2001 (all minimum grade C-). ',
'3202': 'Requisites: Requires prerequisite courses of CSCI 2270 and CSCI 2824 or MATH 2001 or ECEN 2703 or APPM 3170 and one of the following:  APPM 3570 ',
'5502': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5525': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'6268': 'Requisites: Requires prerequisite course of CSCI 5273 (minimum grade B). Restricted to graduate students only. ',
'6302': 'Requisites: Restricted to graduate students only. ',
'7772': 'Requisites: Restricted to graduate students only. ',
'7818': 'Requisites: Restricted to graduate students only. ',
'4448': 'Requisites: Requires prerequisite courses of CSCI 3155 and CSCI 3308 (all minimum grade C-). ',
'4502': 'Requisites: Requires prerequisite course of CSCI 2270 (minimum grade C-). ',
'3287': 'Requisites: Requires prerequisite course of CSCI 3104 (minimum grade C-). ',
'3302': 'Requisites: Requires prerequisite courses of CSCI 2270 and CSCI 2824 or ECEN 2703 or APPM 3170 or MATH 2001(all minimum grade C-). ',
'5535': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'5548': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'7900': 'Requisites: Restricted to graduate students only. ',
'8990': 'Requisites: Restricted to graduate students only. ',
'4555': 'Requisites: Requires prerequisite courses of CSCI 3155 and CSCI 2400 or ECEN 3350 (all minimum grade C-). ',
'4576': 'None ',
'4586': 'Requisites: Requires prerequisite course of CSCI 4576 (minimum grade C-). ',
'3308': 'Requisites: Requires prerequisite course of CSCI 2270 (minimum grade C-). ',
'3434': 'Requisites: Requires prerequisite courses of CSCI 3104 and CSCI 3155 (all minimum grade C-). ',
'5551': 'Requisites: Restricted to Computer Science (CSEN) graduate students or Computer Science Concurrent Degree majors only. ',
'4593': 'Requisites: Requires prerequisite course of ECEN 3350 or CSCI 2400 (minimum grade C-).  Restricted to College of Engineering majors only. ',
'4753': 'Requisites: Requires prerequisite course of CSCI 3753 (minimum grade C-). ',
'3656': 'Requisites: Requires prerequisite courses of CSCI 1300 or CSCI 1310 or CSCI 1320 and APPM 1350 or MATH 1300 and APPM 1360 or MATH 2300 and MATH 3130 or APPM 3310 or CSCI 2820 (all minimum grade C-). ',
'3702': 'None ',
'4809': 'None ',
'4810': 'None ',
'3753': 'Requisites: Requires prerequisite courses of CSCI 2270 and either CSCI 2400 or ECEN 3350 (all minimum grade C-). ',
'4830': 'Requisites: Requires prerequisite course of CSCI 2400 (minimum grade C-). '
  },
'ATLS': {
	'2000': 'Test ATLS'
  },
'TLEN': {
	'5842': 'Test TLEN'
	}
};


// ***************************************
//           HELPER FUNCTIONS
// ***************************************

function getFrame(){
	return $("#ptifrmtgtframe").contents();
}

function getNameParts(courseObj){
	var department = courseObj.data.split(" ")[0];
	var courseNumber = courseObj.data.replace("-"," ").split(" ")[1];
	//console.log('deparment: ', department);
	//console.log('course number: ', courseNumber);
	return [department, courseNumber]
}

// This function will eventually draw the course descriptions from the database
// function getCourseDescription(deptartment,number) {
//   var xhttp;
//   if (department == "" || number == "") {
//     document.getElementById("txtHint").innerHTML = "";
//     return;
//   }
//   xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//     document.getElementById("txtHint").innerHTML = this.responseText;
//     }
//   };
//   xhttp.open("GET", "getcustomer.asp?deparment="+deparment+"number="+number, true);
//   xhttp.send();
// }

// FUNCTION: getDaysandTime() parses course times into more usable pieces
// INPUT: ("MoWeFr 2:00PM - 2:50PM")
// OUTPUT: [    ["Mo, "We", "Fr"],   "2:00PM - 2:50PM",   [200, 300]    ]

function getDaysandTime(timeText) {
	var data = timeText.split(" ");
	var days = data[0];
	var startPM = false;
	var endPM = false;

	days = days.match(/.{1,2}/g);

	var timeString = data[1] + " - " + data[3];

	var timeStart = data[1];
	timeStart = timeStart.split("P")[0];
	if(timeStart.length <= 4) {
		startPM = true;
	} else {
		timeStart = timeStart.split("A")[0];
	}
	timeStart1 = timeStart.split(":");
	timeStart = timeStart1[0] + timeStart1[1];

	timeStart = parseInt(timeStart);

	var timeEnd = data[3]
	timeEnd = timeEnd.split("P")[0];
	if(timeEnd.length <= 4) {
		endPM = true;
	} else {
		timeEnd= timeEnd.split("A")[0];
	}
	timeEnd1 = timeEnd.split(":");
	timeEnd = timeEnd1[0] + timeEnd1[1];

	timeEnd = parseInt(timeEnd);

	if(startPM && timeStart < 1200) {
		timeStart += 1200
	}

	if(endPM && timeEnd < 1200) {
		timeEnd += 1200
	}

	if (timeEnd % 100 > 30) {
		timeEnd = timeEnd + (100 - (timeEnd % 100))
	}
	else if (timeEnd % 100 > 10) {
		timeEnd  = timeEnd + (30 - (timeEnd % 100))
	}

	return [days, timeString, [timeStart, timeEnd]]
}



// ***************************************
//             MAIN FUNCTION
// ***************************************

$(document).ready(function(){
	$("iframe")[0].addEventListener("load",function(){
		iframe = getFrame();


		//Add new header to shopping cart table for course catalog Links
		tableBody = iframe.find('.PSLEVEL1GRIDNBO');
		tableBody.width(900) //change the width of the whole table so links fit
		tableBody = tableBody.find('tbody');
		firstRow = $(tableBody).children().eq(0); 	//access first row in tbody
		firstRow = firstRow.find('td:first') //find first td
		firstRow.attr('colspan', '12')	//change attribute value
		secondChild = $(tableBody).children().eq(1);
		secondChild.append('<th scope="col" width="200" align="left" class="PSLEVEL3GRIDCOLUMNHDR"><a>Course Catalog Link</a></th>') //makes header



//Shopping Cart Sort Function Fix
		/*
		* I had to create a sort function from scratch because CU handles all of their
		* requests through really shitty hrefs attributes linking to javascript, making it impossible to call
		* for our load event to go off again after you click the header buttons.
		*
		* Still Needs a way to sort by status / enroll status.
		*/
		function sortShoppingCart(f,n, tableBody){
			//Helper Function for sorting the shopping cart
			var rows = $(tableBody).find('tr').get();
			console.log(tableBody)
			rows.sort(function(a, b) {
			// This is a prototype for javascript's built in sort function.
			// More here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort?v=control
				var A = getVal(a);
				var B = getVal(b);
				if(A < B) {
					return -1*f;
				}
				if(A > B) {
					return 1*f;
				}
				return 0;
			});


			function getVal(elm){
				var v = -1
				if (n == 7) { //case Status
					vElm = $(elm).children('td').eq(n).find('img')
					if(vElm.length == 0){ //Just some error catching. Uses default.
						v =  $(elm).children('td').eq(n).text().toUpperCase();
					}else{
						console.log('I just hit status!')
						if(vElm[0].alt == 'Open'){
							v = 0
						}else if(vElm[0].alt == 'Wait List'){
							v = 1
						}else{
							v = 2
						}
					}
				} else if (n == 8){ //Enroll Status
					vElm = $(elm).children('td').eq(n).find('img')
					if(vElm.length == 0){
						v = 0
					}else{
						v = 1
					}
				} else { //All other cases
					v = $(elm).children('td').eq(n).text().toUpperCase();
				}
				if ($.isNumeric(v)) {
					v = parseInt(v,10);
				}
				return v;
			}

			$.each(rows, function(index, row) {
				firstTD = $(row).children('td').eq(0).text().toUpperCase()
				if(firstTD == ''){
					//Table Header Row
					$(tableBody).before(row);

				}else if($(row).children().length == 1){
					//Table Label Row (the part that says Fall 2017 UC Boulder... etc)
					$(tableBody).before(row);

				}else{
					$(tableBody).append(row);
				}
			});
		}
		var sortFlag = 1; //Determines sort order

		secondChild.find("th").each(function(i, tableHeader) {
			$(tableHeader.children[0]).removeAttr('href')
			$(tableHeader).click(function() {
				sortFlag *= -1;
				var n = $(this).prevAll().length; // Finds the column number to sort by
				sortShoppingCart(sortFlag,n,tableBody);
			});
		});
//End of sort fix


		// Create course dictionary for use in "What If" Calendar
		var courseDict = {};



		// ***************************************
		//           SHOPPING CART DATA
		// ***************************************

		// Loop through courses in shopping cart and apply desired parsing/functions
		iframe.find('.PSLEVEL3GRIDWBO').find('span').each(function(i, item){

			// Parse Course Name Information from shopping cart and apply functionality
			if(item.id.match("^P_CLASS_NAME")){
				/*
				First thing's first, after locating a "course" in our shopping cart, we have to get the course name.
				The text that defines the course ("CSCI 1300", for example) will be found as the first child of item if the
				course has no link attached (.id == undefined) and will be the first child's first child if it is a hyperlink.
				*/
				var textObj = item.firstChild;
				//console.log(textObj)
				if(textObj.id != undefined){
					textObj = textObj.firstChild;
					//console.log(textObj);
				}
				else{
					//console.log(textObj);
				}
				// Split the course name into a department tag and a course number:
				var classinfo = getNameParts(textObj);

				// REMOVE TO GET PRE-REQS FOR ALL CLASSES
				if(classinfo[0] == "CSCI") { 
					$(item).attr('title', prereqs[classinfo[0]][classinfo[1]]);
				}
				//Create our link to the course catalog based on the info we pulled from the class name:
				var classCatalogLink = 'http://www.colorado.edu/catalog/2016-17/courses?subject='+classinfo[0]+'&number='+classinfo[1]

				//Now, we have to go to the table row (tr tag) and append it with another element that contains a hyperlink to the
				//The respective course catalog entry.
				//The tr should be the closest one available in the doc tree. Look up 'jquery closest' for more info
				var tableRow = item.closest('tr');
				//add a new td after the last entry in the table, to make a new box to put stuff in:
				$(tableRow).find('td:last').after('<td class="PSLEVEL3GRIDWBO" align=center>'
				+ '<a href= '+ classCatalogLink+ ' target="_blank">'
				+ classinfo[0]+'-'+classinfo[1]
				+ '</a></td>');

				$(item).hover(
				function() {
					/*
					This function occurs when the mouse hover starts.
					*/
					//console.log('hoverStartDpt:', classinfo[0]);
					},
				function() {
					/*
					This happens when the user stops hovering the mouse over the item.
					*/
					//console.log('hoverReleaseCrse:', classinfo[1]);
					}
				);

				// Create dictionary entry for the course in courseDict for future use in "What If" Calendar
				var fullCourseName = textObj.data;
				courseDict[fullCourseName] = {
						"days": "null",
						"time": "null",
						"times": "null",
						"location": "null",
						"instr": "null",
						"units": "null",
						"span": "null",
						"enrolled": false,
						"mapped": false,
						"dropped": false
				};
			}

			// Parse Course Time Information from shopping cart
			else if(item.id.match("^DERIVED_REGFRM1_SSR_MTG_SCHED_LONG")) {
				//console.log(item);
				var timeText = $(this).text();
				//console.log(timeText);

				// Parse course time into more usable format
				var schedule = getDaysandTime(timeText);

				// Search for first course in dictionary missing a date/time and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["days"] == "null") {
						courseDict[course]["days"] = schedule[0];
						courseDict[course]["time"] = schedule[1];
						courseDict[course]["times"] = schedule[2];
						var timeSpan = (schedule[2][1]-schedule[2][0]) / 100;
						if (timeSpan % 1 == 0) {
							courseDict[course]["span"] = timeSpan * 2;
						} else {
							timeSpan = Math.ceil(timeSpan) + 1;
							courseDict[course]["span"] = timeSpan;
						}
						break;
					}
				}

			}

			// Parse Course Location Information from shopping cart
			else if(item.id.match("^DERIVED_REGFRM1_SSR_MTG_LOC_LONG")) {
				// console.log(item);
				var locText = $(this).text();
				//console.log(locText);

				// Search for first course in dictionary missing a location and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["location"] == "null") {
						courseDict[course]["location"] = locText;
						break;
					}
				}

			}

			// Parse Course Instructor Information from shopping cart
			else if(item.id.match("^DERIVED_REGFRM1_SSR_INSTR_LONG")) {
				//console.log(item);
				var instrText = $(this).text();
				//console.log(instrText);

				// Search for first course in dictionary missing an instructor and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["instr"] == "null") {
						courseDict[course]["instr"] = instrText;
						break;
					}
				}

			}

			// Parse Course Unit Information from shopping cart
			else if(item.id.match("^SSR_REGFORM_VW_UNT_TAKEN")) {
				// console.log(item);
				var unitText = $(this).text();
				//console.log(unitText);

				// Search for first course in dictionary missing unit information and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["units"] == "null") {
						courseDict[course]["units"] = unitText;
						break;
					}
				}
			}

		});



		// ***************************************
		//         ENROLLED COURSE DATA
		// ***************************************

		// Loop through courses already registered and apply desired parsing/functions
		iframe.find('.PSLEVEL2GRIDROW').find('span').each(function(i, item){

			// Parse Course Name Information from enrolled courses
			if(item.id.match("^E_CLASS_NAME")){
				/*
				First thing's first, after locating a "course" in our course list, we have to get the course name.
				The text that defines the course ("CSCI 1300", for example) will be found as the first child of item if the
				course has no link attached (.id == undefined) and will be the first child's first child if it is a hyperlink.
				*/
				var textObj = item.firstChild;
				//console.log(textObj)
				if(textObj.id != undefined){
					textObj = textObj.firstChild;
					//console.log(textObj);
				}
				else{
					//console.log(textObj);
				}

				// Create dictionary entry for the course in courseDict for future use in "What If" Calendar
				var fullCourseName = textObj.data;
				courseDict[fullCourseName] = {
						"days": "null",
						"time": "null",
						"times": "null",
						"location": "null",
						"instr": "null",
						"units": "null",
						"span": "null",
						"enrolled": true,
						"mapped": false,
						"dropped": false
				};

				$(this).closest('tr').find('div').each(function(i, imgItem){
					if(imgItem.id.match("^win0divDERIVED_REGFRM1_SSR_STATUS_LONG")){
						if($(this).find('img').attr('alt') == "Dropped") {
							console.log(fullCourseName + " has been dropped.");
							courseDict[fullCourseName]["dropped"] = true;
						}
					}
				});
			}

			// Parse Course Time Information from enrolled courses
			else if(item.id.match("^DERIVED_REGFRM1_SSR_MTG_SCHED_LONG")) {
				// console.log(item);
				var timeText = $(this).text();
				//console.log(timeText);

				// Parse course time into more usable format
				var schedule = getDaysandTime(timeText);

				// Search for first course in dictionary missing a date/time and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["days"] == "null") {
						courseDict[course]["days"] = schedule[0];
						courseDict[course]["time"] = schedule[1];
						courseDict[course]["times"] = schedule[2];
						var timeSpan = (schedule[2][1]-schedule[2][0]) / 100;
						if (timeSpan % 1 == 0) {
							courseDict[course]["span"] = timeSpan * 2;
						} else {
							timeSpan = Math.floor(timeSpan) * 2 + 1;
							courseDict[course]["span"] = timeSpan;
						}
						break;
					}
				}

			}

			// Parse Course Location Information from enrolled courses
			else if(item.id.match("^DERIVED_REGFRM1_SSR_MTG_LOC_LONG")) {
				// console.log(item);
				var locText = $(this).text();
				//console.log(locText);

				// Search for first course in dictionary missing a location and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["location"] == "null") {
						courseDict[course]["location"] = locText;
						break;
					}
				}

			}

			// Parse Course Instructor Information from enrolled courses
			else if(item.id.match("^DERIVED_REGFRM1_SSR_INSTR_LONG")) {
				//console.log(item);
				var instrText = $(this).text();
				//console.log(instrText);

				// Search for first course in dictionary missing an instructor and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["instr"] == "null") {
						courseDict[course]["instr"] = instrText;
						break;
					}
				}

			}

			// Parse Course Unit Information from enrolled courses
			else if(item.id.match("^STDNT_ENRL_SSVW_UNT_TAKEN")) {
				// console.log(item);
				var unitText = $(this).text();
				// console.log(unitText);

				// Search for first course in dictionary missing unit information and populate with new data
				for (var course in courseDict) {
					if(!courseDict.hasOwnProperty(course)) {
						continue;
					}
					if (courseDict[course]["units"] == "null") {
						courseDict[course]["units"] = unitText;
						break;
					}
				}
			}
		});

		// Display  final course dictionary for "What If" Calendar
		console.log(courseDict);



		// ***************************************
		//           "WHAT IF" CALENDAR
		// ***************************************

		//All of this nonsense is straight copy-paste HTML from the "weekly calendar view" page
		var calendar= "<div><p></p>"

		//This is all just formatting
		calendar += "<table cellspacing='0' cellpadding='2' width='100%' class='PSLEVEL1GRIDNBO' id='SHOPPING_CART_SCHED_HTMLAREA'>"
		calendar += "<colgroup span='1' width='9%' align='center' valign='middle'>"
		calendar += "<colgroup span='7' width='13%' align='center' valign='middle'><tr><th scope='col' align='center' class='SSSWEEKLYA1BACKGROUND' >Time</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Monday<br>"
		calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Tuesday<br>"
		calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Wednesday<br>"
		calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Thursday<br>"
		calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Friday<br>"
		//calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Saturday<br>"
		//calendar += "</th><th scope='col' align='center' class='SSSWEEKLYDAYBACKGROUND' >Sunday<br>"
		calendar += "</th>"
		calendar += "</tr>"

		//All this populates the calendar
		/*
		 * It looks like this is the way they're populating the table:
		 * rowspan => how many vertical rows to be populated
		 * SSWEEKLYTIMEBACKGROUND => green background color
		 * SSWEEKLYTIME => defines the time field
		 * SSTEXTWEEKLY => defines text to add to the cell
		 * PSLEVEL3GRID "&nbsp => empty cell
		 */

		var time;
		var max_time = 2000;
		var weekdays = ["Mo", "Tu", "We", "Th", "Fr"];
		var conflictDict = {};
		var time = 800;
		var half = false;
		var time_add;
		var overflowStr = ''
		var overflowRows = [[0, ''],[0, ''],[0, ''],[0, ''],[0, '']] //For dealing with multi-row crap. 
		while(time<=max_time){
			var civ_time = String(Math.floor(time/100));
			if (time<1200){
				if(half == false){
					civ_time += ":00 am"
				}
				else{
					civ_time += ":30 am"
				}
			}
			else if (time>1200){
				if(half == false){
					civ_time = String(Math.floor((time/100)-12))+":00 pm"
				}
				else{
					if(time > 1230){
						civ_time = String(Math.floor((time/100)-12))+":30 pm"
					} else {
						civ_time = String(Math.floor(time/100)) + ":30 pm"
					}
				}
			}
			else{
				civ_time += ":00 pm"
			}
			// console.log("Time: " + time + " " + "Civ Time: " + civ_time);

			if (half == false){
				time_add = 30;
			}
			else{
				time_add = 70;
			}
			for (j = 0; j < 5; j++){ //
				if(overflowRows[j] > 0){
					overflowStr += weekdays[j]
				}
			}
			console.log(overflowStr, 'overflow', time)
			calendar += "<tr" + "overwrittenRows = " + overflowStr + ">"
			calendar += "<td class='SSSWEEKLYTIMEBACKGROUND' rowspan='1'>"
			calendar += "<span class='SSSTEXTWEEKLYTIME' >"+civ_time+"</span>"
			calendar += "</td>"
			for(var i = 0; i<5; i++){
				var empty = true;
				var prevEntry = null;
				for(var course in courseDict){
					if($.inArray(weekdays[i], courseDict[course]["days"])!=(-1)){
						if((courseDict[course]["times"][0] >= time) && (courseDict[course]["times"][0]<(time+time_add))){
							if (courseDict[course]["dropped"] == false){
								if(empty == true && overflowRows[i][0] == 0){
									overflowRows[i][0] = courseDict[course]["span"]
									overflowRows[i][1] = course
									console.log(course, 'overflows by ' + courseDict[course]["span"])
									calendar += "<td class='SSSWEEKLYBACKGROUND' rowspan='"+String(courseDict[course]["span"])+"'>"
									calendar += "<span class='SSSTEXTWEEKLY' >"+course+"<br>"+courseDict[course]["instr"]+"<br>"+courseDict[course]["time"]+"<br>"+courseDict[course]["location"]+"<br>"+courseDict[course]["units"]+"</span></td>"
									empty = false
									prevEntry = course
								}else{
									if(empty == false){ // Conflict where two courses start at the same time
										if(conflictDict[i + ' ' + time] == undefined){
											conflictDict[i + ' ' + time] = [course,prevEntry]
										}else{
											conflictDict[i + ' ' + time] = conflictDict[i + ' ' + time].concat(course)
										}
										
									} else { // Conflict where the tail of one class overlaps the other
										if(conflictDict[i + ' ' + time] == undefined){
											conflictDict[i + ' ' + time] = [overflowRows[i][1],course]
										}else{
											conflictDict[i + ' ' + time] = conflictDict[i + ' ' + time].concat(course)
										}
									}
								}
							}
						}

					}
				}
				if (empty == true){
					if(overflowRows[i][0] == 0){
						calendar += "<td class='PSLEVEL3GRID'>&nbsp;</td>"
					}
				}
			}
			
			for (j = 0; j < 5; j++){ //
				if(overflowRows[j][0] > 0){
					overflowRows[j][0] -= 1
				}
			}
			console.log(overflowRows)
			calendar += "</tr>"
			if (half == false){
				time += time_add;
				half = true;
			}
			else{
				time += time_add;
				half = false;
			}
			overflowStr = ''
		}
		console.log(conflictDict)

		calendar += "</table>"
		calendar += "</div>"
		calendar += "</div>"

		iframe.find('.PSLEVEL1GRIDNBO').after(calendar);

		var calendar = iframe.find('#SHOPPING_CART_SCHED_HTMLAREA');

		calendar.find('tr').each(function(i, row){
			rowTime = i*100 +700
			for (conflict in conflictDict){
				if (conflict.substr(2, conflict.length)  == rowTime) {
					var dayIndex = parseInt(conflict[0]) + 1
					var course = 'BLANK'
					var conflictElm = $(row).find('td')[dayIndex]
					var conflictSpan = $(conflictElm).find('span')
					$(conflictElm).attr('conflict', conflict)
					var courseFlag = 1; //determines whether course1 or course2 should be displayed
					$(conflictElm)[0].addEventListener('click', function(){
						courseFlag *= -1;
						if(courseFlag == 1){
							course = conflictDict[$(conflictElm).attr('conflict')]['course1']

						}else{
							course = conflictDict[$(conflictElm).attr('conflict')]['course2']
						}
						$(this).html(course+"<br>"
						+courseDict[course]["instr"]+"<br>"
						+courseDict[course]["time"]+"<br>"
						+courseDict[course]["location"]+"<br>"
						+courseDict[course]["units"])
					});

				}

			}
		});



		//document.querySelector("[id^='win0div$ICField']").id.innerHTML += calendar;
	});
});