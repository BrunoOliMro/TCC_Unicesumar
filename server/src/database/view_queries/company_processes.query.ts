export const vwCompanyProcessesQuery = `
create view vw_company_processes as 
select
	process.id as id,
    odfs.id as odf_id,
    process.part_number_id as item_id,
	machines.id as machine_id,
    odfs.odf as odf,
    items.price as price,
    odfs.odf_qtd as odf_qtd,
	odfs.ship_date as ship_date,
    process.execut_time as execut_time,
    process.setup_time as setup_time,
    process.op_num as op_num,
	odfs.critic as critic,
    items.part_number as item,
	machines.machine as machine_name,
    psm.machine_index as machine_index,
    odfs_qtd.finished_qtd as finished_qtd,
    odfs_qtd.refused_qtd as refused_qtd,
	odfs_qtd.missing_qtd as missing_qtd,
    it.type_hex as type_hex,
    ifnull((coalesce(lag(odfs_qtd.finished_qtd) over (partition by odfs.odf, odfs.part_number_id order by process.op_num, odfs.odf_qtd), odfs.odf_qtd) - finished_qtd - refused_qtd - missing_qtd - ifnull((
			select 
			(sum(inner_qtd.refused_qtd) + sum(inner_qtd.missing_qtd)) as sum_qtd
			from tbl_odfs_qtd inner_qtd
			inner join tbl_process inner_process on inner_process.id=inner_qtd.process_id
            where inner_process.op_num < process.op_num and inner_qtd.process_id=process.id and inner_qtd.odf_id=odfs.id
    ), 0)), odfs.odf_qtd) as av_qtd,
    pstatus.remodel_index as remodel_index,
    pstatus.invalid_sequence_reason,
	ig.item_grouping as item_grouping,
    ig.id as grouping_id,
    it.type as item_type,
    it.type_hex as item_hex,
    process.company_id as company_id,
    pp.start_datetime,
    pp.end_datetime
    from tbl_part_numbers items
    inner join tbl_process process on items.id=process.part_number_id
    inner join tbl_odfs odfs on odfs.part_number_id=items.id
    inner join tbl_machines machines on machines.id=process.machine_id
	inner join tbl_odfs_qtd odfs_qtd on odfs_qtd.odf_id=odfs.id and odfs_qtd.process_id=process.id
    left join tbl_processes_selected_machines psm on psm.process_id=process.id and psm.odf_id=odfs.id
	left join tbl_part_numbers_type it on items.part_number_type=it.id
	left join tbl_processes_status pstatus on pstatus.odf_id=odfs.id and pstatus.process_id=process.id
	left join tbl_groupings ig on pstatus.grouping_id=ig.id
    left join (
		select 
			odf_id,
            process_id, 
            MIN(start_datetime) as start_datetime,
            MIN(end_datetime) as end_datetime
            from tbl_active_processes_production_periods
            group by 
            odf_id,
            process_id
    ) pp
    on pp.process_id=process.id and pp.odf_id=odfs.id
    where pstatus.finished is null or pstatus.finished = 0
`;

// export const vwCompanyProcessesQuery = `
// create view vw_company_processes as
// select
// 	process.id as id,
//     odfs.id as odf_id,
//     process.part_number_id as item_id,
// 	machines.id as machine_id,
//     odfs.odf as odf,
//     odfs.odf_qtd as odf_qtd,
//     odfs.active as active,
// 	odfs.ship_date as ship_date,
//     process.execut_time as execut_time,
//     process.setup_time as setup_time,
//     process.op_num as op_num,
// 	odfs.critic as critic,
//     items.part_number as item,
// 	machines.machine as machine_name,
//     psm.machine_index as machine_index,
//     odfs_qtd.finished_qtd as finished_qtd,
//     odfs_qtd.refused_qtd as refused_qtd,
// 	odfs_qtd.missing_qtd as missing_qtd,
//     ifnull((coalesce(lag(odfs_qtd.finished_qtd) over (partition by odfs.odf, odfs.part_number_id order by process.op_num, odfs.odf_qtd) - finished_qtd)), odfs.odf_qtd) as av_qtd,
//     pstatus.remodel_index as remodel_index,
// 	ig.item_grouping as item_grouping,
//     it.type as item_type,
//     it.type_hex as item_hex,
//     process.company_id as company_id,
//     (select start_datetime from tbl_active_processes_production_periods where odf_id=odfs.id and process_id=process.id order by start_datetime asc limit 1) as start_datetime,
// 	(select end_datetime from tbl_active_processes_production_periods where odf_id=odfs.id and process_id=process.id order by end_datetime desc limit 1) as end_datetime
//     from tbl_part_numbers items
//     inner join tbl_process process on items.id=process.part_number_id
//     inner join tbl_odfs odfs on odfs.part_number_id=items.id
//     inner join tbl_machines machines on machines.id=process.machine_id
// 	inner join tbl_odfs_qtd odfs_qtd on odfs_qtd.odf_id=odfs.id and odfs_qtd.process_id=process.id
//     left join tbl_processes_selected_machines psm on psm.process_id=process.id and psm.odf_id=odfs.id
// 	left join tbl_part_numbers_type it on items.part_number_type=it.id
// 	left join tbl_processes_status pstatus on pstatus.odf_id=odfs.id and pstatus.process_id=process.id
// 	left join tbl_groupings ig on pstatus.grouping_id=ig.id
// `;