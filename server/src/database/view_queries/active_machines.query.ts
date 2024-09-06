export const vwActiveMachinesQuery = `
create view vw_active_machines
as
select
	distinct
    machines.id as id,
    process.company_id,
    machines.machine as machine_name,
    psm.machine_index,
    machine_groups.machine_group,
    MIN(ppp.end_datetime) as end_datetime
    from 
    tbl_process process
    inner join tbl_part_numbers pn on pn.id=process.part_number_id
    inner join tbl_odfs odf on pn.id=odf.part_number_id
    inner join tbl_machines machines on machines.id=process.machine_id
    left join tbl_machine_groups machine_groups on machine_groups.id=machines.machine_group_id
    left join tbl_processes_selected_machines psm on psm.odf_id=odf.id and psm.process_id=process.id and psm.machine_id=machines.id
	inner join tbl_active_processes_production_periods ppp on psm.process_id=ppp.process_id and psm.odf_id=ppp.odf_id
    where ppp.start_datetime is not null and ppp.end_datetime is not null
    group by
	machines.id,
    process.company_id,
    machines.machine,
    psm.machine_index,
    machine_groups.machine_group
    order by machine_groups.machine_group, machines.machine, psm.machine_index
`;


// export const vwActiveMachines = `
// create view vw_active_machines
// as
// select
//     distinct
//     process.company_id,
//     machines.machine as machine_name,
//     info.machine_index,
//     machine_groups.machine_group,
//     (
// 	case
//             when NOW() > (
//                 select end_datetime
//                 from tbl_active_processes_production_periods
// 				inner join tbl_machines inner_machines on inner_machines.id=process.machine_id
// 				where inner_machines.id=process.machine_id
//                 order by end_datetime desc
//                 limit 1
//             ) then 1
//             else 0
//         end
//     ) as machine_delayed
//     from
//     tbl_process process
//     inner join tbl_part_numbers pn on pn.id=process.part_number_id
//     inner join tbl_odfs odf on pn.id=odf.part_number_id
//     inner join tbl_machines machines on machines.id=process.machine_id
//     inner join tbl_machines_info info on info.machine_id=machines.id
//     left join tbl_machine_groups machine_groups on machine_groups.id=machines.machine_group_id
//     left join tbl_processes_selected_machines psm on psm.odf_id=odf.id and psm.process_id=process.id and psm.machine_id=machines.id
// 	inner join tbl_active_processes_production_periods ppp on psm.process_id=ppp.process_id and psm.odf_id=ppp.odf_id
//     where odf.active=1 and ppp.start_datetime is not null and ppp.end_datetime is not null
//     order by machine_groups.machine_group, machines.machine, info.machine_index
// `;
// export const vwActiveMachinesQuery = `
// create view vw_active_machines
// as
// select
// 	distinct
//     machines.id as id,
//     process.company_id,
//     machines.machine as machine_name,
//     psm.machine_index,
//     machine_groups.machine_group,
//     (
// 	case
//             when NOW() > (
//                 select end_datetime
//                 from tbl_active_processes_production_periods
// 				inner join tbl_machines inner_machines on inner_machines.id=process.machine_id
// 				where inner_machines.id=process.machine_id
//                 order by end_datetime desc
//                 limit 1
//             ) then 1
//             else 0
//         end
//     ) as machine_delayed
//     from
//     tbl_process process
//     inner join tbl_part_numbers pn on pn.id=process.part_number_id
//     inner join tbl_odfs odf on pn.id=odf.part_number_id
//     inner join tbl_machines machines on machines.id=process.machine_id
//     left join tbl_machine_groups machine_groups on machine_groups.id=machines.machine_group_id
//     left join tbl_processes_selected_machines psm on psm.odf_id=odf.id and psm.process_id=process.id and psm.machine_id=machines.id
// 	inner join tbl_active_processes_production_periods ppp on psm.process_id=ppp.process_id and psm.odf_id=ppp.odf_id
//     where ppp.start_datetime is not null and ppp.end_datetime is not null
//     order by machine_groups.machine_group, machines.machine, psm.machine_index
// `;


// // export const vwActiveMachines = `
// // create view vw_active_machines
// // as
// // select
// //     distinct
// //     process.company_id,
// //     machines.machine as machine_name,
// //     info.machine_index,
// //     machine_groups.machine_group,
// //     (
// // 	case
// //             when NOW() > (
// //                 select end_datetime
// //                 from tbl_active_processes_production_periods
// // 				inner join tbl_machines inner_machines on inner_machines.id=process.machine_id
// // 				where inner_machines.id=process.machine_id
// //                 order by end_datetime desc
// //                 limit 1
// //             ) then 1
// //             else 0
// //         end
// //     ) as machine_delayed
// //     from
// //     tbl_process process
// //     inner join tbl_part_numbers pn on pn.id=process.part_number_id
// //     inner join tbl_odfs odf on pn.id=odf.part_number_id
// //     inner join tbl_machines machines on machines.id=process.machine_id
// //     inner join tbl_machines_info info on info.machine_id=machines.id
// //     left join tbl_machine_groups machine_groups on machine_groups.id=machines.machine_group_id
// //     left join tbl_processes_selected_machines psm on psm.odf_id=odf.id and psm.process_id=process.id and psm.machine_id=machines.id
// // 	inner join tbl_active_processes_production_periods ppp on psm.process_id=ppp.process_id and psm.odf_id=ppp.odf_id
// //     where odf.active=1 and ppp.start_datetime is not null and ppp.end_datetime is not null
// //     order by machine_groups.machine_group, machines.machine, info.machine_index
// // `;